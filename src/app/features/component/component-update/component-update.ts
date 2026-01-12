import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiLoader, tuiLoaderOptionsProvider, TuiLabel, TuiTextfield, TuiDropdown, TuiDataList, tuiDateFormatProvider, TuiError } from "@taiga-ui/core";
import { InputLabel } from "../../../shared/input-label/input-label";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FullComponentRes } from '../../../core/dto/component/component-res';
import { UpdateComponentReq } from '../../../core/dto/component/component-req';
import { TuiForm } from "@taiga-ui/layout";
import { TuiDataListWrapper, TuiInputDate, TuiChevron, TuiSelectDirective, TuiSwitch, TuiFieldErrorPipe } from "@taiga-ui/kit";
import { CheckTokenMap, checkTokenStringify } from '../../../core/enums/component-check-token.enum';
import { ComponentStatusMap, statusStringify } from '../../../core/enums/component-status.enum';
import { MessageTypeRes } from '../../../core/dto/message-type/message-type-res';
import { MessageTypeService } from '../../../core/service/message-type/message-type-service';
import { map } from 'rxjs';
import { ComponentService } from '../../../core/service/component/component-service';
import { TuiDay } from '@taiga-ui/cdk';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Button } from "../../../shared/button/button";
import { toSignal } from '@angular/core/rxjs-interop';
import { updateDateMustInFutureDate } from '../../../shared/validators/date.validator';
import { NotifyService } from '../../../shared/notification/notify-service';

type UpdateFormControls = { [K in keyof UpdateComponentReq]: FormControl<UpdateComponentReq[K]> };

@Component({
  selector: 'app-component-update',
  imports: [TuiLoader, TuiLabel, InputLabel, ReactiveFormsModule, TuiForm, TuiChevron, TuiSelectDirective, TuiSwitch,
    TuiTextfield, TuiDropdown, TuiInputDate, TuiDataList, TuiDataListWrapper, Button, TuiError, AsyncPipe, TuiFieldErrorPipe],
  templateUrl: './component-update.html',
  styleUrl: './component-update.css',
  providers: [tuiLoaderOptionsProvider({
    size: 'xl',
    inheritColor: true
  }),
  tuiDateFormatProvider({ mode: 'DMY', separator: '-' })]
})
export class ComponentUpdate implements OnInit {
  protected isLoading = signal<boolean>(false);

  private componentService = inject(ComponentService);
  private msgTypeService = inject(MessageTypeService);
  private notifyService = inject(NotifyService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  id: string | number | null = null;

  protected updateForm = new FormGroup<UpdateFormControls>({
    componentCode: new FormControl<any>(null, [Validators.required, Validators.maxLength(20)]),
    componentName: new FormControl<any>(null, [Validators.required, Validators.maxLength(150)]),
    effectiveDate: new FormControl<any>(null, [updateDateMustInFutureDate]),
    endEffectiveDate: new FormControl<any>(null, [updateDateMustInFutureDate]),
    checkToken: new FormControl<any>(null),
    status: new FormControl<any>(null),
    connectionMethod: new FormControl<any>(null, [Validators.maxLength(1000)]),
    messageType: new FormControl<any>(null, [Validators.maxLength(1500)]),
    isDisplay: new FormControl<any>(null),
    isActive: new FormControl<any>(null),
  });

  protected updateFormInvalid = toSignal(
    this.updateForm.statusChanges.pipe(
      map(status => status === 'INVALID')
    ),
    { initialValue: true }
  );

  protected apiData!: FullComponentRes;


  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');

    this.isLoading.update(() => true);

    const activeStatus = 1;
    this.msgTypeService.getMessageTypes(activeStatus).pipe(
      map(response => response.data)
    ).subscribe({
      next: (data) => this.msgType = data,
      error: (errorResponse) => {
        this.notifyService.notifyError(undefined, `Failed to load message types`, 5000);
      }
    });

    if (!Number.isNaN(Number(this.id))) {
      this.componentService.fetchComponentById(Number(this.id)).subscribe({
        next: (response) => {
          const rawData = response.data;
          this.apiData = {
            ...rawData,
            effectiveDate: this.formatToTuiDay(rawData.effectiveDate),
            endEffectiveDate: this.formatToTuiDay(rawData.endEffectiveDate),
          };
          this.updateForm.reset(this.apiData);
          this.isLoading.update(() => false);
        },
        error: (errorResposne) => {
          this.isLoading.update(() => false);
          this.notifyService.notifyError(undefined, `Failed to load data`, 5000);
        }
      });
    }
  }

  protected checkTokens = Object.values(CheckTokenMap);
  protected checkTokenStringify = checkTokenStringify;
  protected statuses = Object.values(ComponentStatusMap);
  protected statusStringify = statusStringify;

  protected msgType: MessageTypeRes[] = [];

  protected backToList(): void {
    this.router.navigate(['/components']);
  }

  protected cancel(): void {
    if (this.updateForm.dirty) {
      this.notifyService.showConfirmDialog('Discard Changes', 'Are you sure you want to discard your changes?', () => this.updateForm.reset(this.apiData));
    }
  }

  protected update(): void {
    this.isLoading.update(() => true);
    const payload: UpdateComponentReq = {
      ...this.updateForm.value,
      isDisplay: this.convertBooleanToNumber(this.updateForm.value.isDisplay),
      isActive: this.convertBooleanToNumber(this.updateForm.value.isActive),
    };
    console.log(payload);
    this.componentService.updateComponent(Number(this.id), payload).subscribe({
      next: (response) => {
        this.isLoading.update(() => false);
        if (response.status === 200) {
          this.notifyService.notifySuccess(undefined, 'Component updated successfully', 5000);
          this.router.navigate(['/components/update', this.id]);
        }
      },
      error: (errorResponse) => {
        this.isLoading.update(() => false);
        console.log(errorResponse);
        this.notifyService.notifyError(undefined, `Failed to update component: ${errorResponse.error.message}`, 5000);
      }
    })
  }

  private formatToTuiDay(dateString: string | null): TuiDay | null {
    if (!dateString) return null;
    return TuiDay.fromLocalNativeDate(new Date(dateString));
  }

  private convertBooleanToNumber(value: boolean | number | undefined): number | undefined {
    if (value === undefined) return undefined;
    return value ? 1 : 0;
  }
}
