import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateComponentReq } from '../../../core/dto/component/component-req';
import { TuiForm } from "@taiga-ui/layout";
import { TuiTextfield, TuiCalendar, TuiDropdown, TuiDataList, tuiDateFormatProvider, TuiLoader, tuiLoaderOptionsProvider, TuiAlertService, TuiError } from '@taiga-ui/core';
import { InputLabel } from "../../../shared/input-label/input-label";
import { TuiInputDateDirective, TuiSelectDirective, TuiChevron, TuiDataListWrapper, TuiFieldErrorPipe } from "@taiga-ui/kit";
import { MessageTypeRes, msgTypeStringify } from '../../../core/dto/message-type/message-type-res';
import { MessageTypeService } from '../../../core/service/message-type/message-type-service';
import { map } from 'rxjs';
import { Button } from "../../../shared/button/button";
import { CheckTokenMap, checkTokenStringify } from '../../../core/enums/component-check-token.enum';
import { Router } from '@angular/router';
import { ComponentService } from '../../../core/service/component/component-service';
import { NotifyService } from '../../../shared/notification/notify-service';
import { AsyncPipe } from '@angular/common';
import { mustInFutureDate } from '../../../shared/validators/date.validator';

type AddFormControls = {
  [K in keyof CreateComponentReq]: FormControl<CreateComponentReq[K] | null>;
}

@Component({
  selector: 'app-component-add',
  imports: [ReactiveFormsModule, TuiForm, InputLabel, TuiCalendar, TuiInputDateDirective, TuiSelectDirective, TuiChevron,
    TuiDataListWrapper, TuiTextfield, TuiDropdown, TuiDataList, Button, TuiLoader, TuiError, TuiFieldErrorPipe, AsyncPipe],
  templateUrl: './component-add.html',
  styleUrl: './component-add.css',
  providers: [
    tuiDateFormatProvider({ mode: "DMY", separator: "-" }),
    tuiLoaderOptionsProvider({
      size: "xl",
      inheritColor: true
    })
  ],
})
export class ComponentAdd implements OnInit {
  protected isLoading = signal(false);

  ngOnInit(): void {
    const activeStatus = 1;
    this.msgTypeService.getMessageTypes(activeStatus)
      .pipe(
        map(response => response.data)
      )
      .subscribe({
        next: (data) => this.msgTypes.set(data)
      });
  }

  protected msgTypes = signal<MessageTypeRes[]>([]);

  private componentService = inject(ComponentService);
  private msgTypeService = inject(MessageTypeService);
  private router = inject(Router);
  private notifyService = inject(NotifyService);

  protected addForm = new FormGroup<AddFormControls>({
    componentCode: new FormControl<any>(null, [Validators.required, Validators.maxLength(20)]),
    componentName: new FormControl<any>(null, [Validators.required, Validators.maxLength(150)]),
    messageType: new FormControl<any>(null, [Validators.maxLength(1500)]),
    connectionMethod: new FormControl<any>(null, [Validators.maxLength(1000)]),
    effectiveDate: new FormControl<any>(null, [mustInFutureDate]),
    checkToken: new FormControl<any>(null),
  });
  protected isDisabledSubmit = toSignal(
    this.addForm.statusChanges.pipe(
      map(status => status === 'INVALID')
    ),
    { initialValue: true }
  );

  protected msgTypeStringify = msgTypeStringify;

  protected readonly checkTokens = Object.values(CheckTokenMap);
  protected readonly checkTokenStringify = checkTokenStringify;

  protected cancel(): void {
    this.router.navigate(['/components']);
  }

  protected add(): void {
    this.isLoading.update(() => true);
    let value = this.addForm.value;
    let messageType = value.messageType as MessageTypeRes;
    value.messageType = messageType ? (messageType.msgType) : null;

    this.componentService.createComponent(value as CreateComponentReq).subscribe({
      next: (response) => {
        const httpStatus = response.status;
        const responseBody = response.body;

        if (httpStatus === 201 && responseBody?.code === '200' && responseBody.data) {
          this.isLoading.update(() => false);
          this.notifyService.notifySuccess(undefined, `Component ${responseBody.data.componentName} created successfully.`, 5000);
          this.router.navigate(['/components']);
        }
      }
    });
  }
}
