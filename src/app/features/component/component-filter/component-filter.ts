import { Component, inject, OnInit, output } from '@angular/core';
import { TuiDataList, TuiDropdown, TuiDropdownDirective, TuiTextfield, tuiDateFormatProvider, TuiLink } from "@taiga-ui/core";
import { Button } from "../../../shared/button/button";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiSearch, TuiForm } from '@taiga-ui/layout';
import { TuiInputDate, TuiChevron, TuiDataListWrapper, TuiSelect } from "@taiga-ui/kit";
import { IStatus, statusStringify } from '../../../core/enums/component-status.enum';
import { SearchComponentCriteria, SearchComponentReq } from '../../../core/dto/component/component-req';
import { CheckTokenMap, checkTokenStringify } from '../../../core/enums/component-check-token.enum';
import { ComponentService } from '../../../core/service/component/component-service';

type SearchFormControls = {
  [K in keyof SearchComponentCriteria]: FormControl<SearchComponentCriteria[K] | null>;
};

@Component({
  selector: 'app-component-filter',
  imports: [TuiTextfield, TuiSearch, TuiInputDate, TuiDataListWrapper, TuiDataList, TuiDropdown, TuiSelect,
    Button, ReactiveFormsModule, TuiForm, TuiDropdownDirective, TuiChevron, TuiLink],
  templateUrl: './component-filter.html',
  styleUrl: './component-filter.css',
  providers: [tuiDateFormatProvider({ mode: "DMY", separator: "-" })],
})
export class ComponentFilter implements OnInit {
  ngOnInit(): void {
    this.componentService.getAllComponentStatuses()
      .subscribe(response => {
        if (response.data) {
          this.statuses.push(...response.data);
        }
      });
  }

  private readonly componentService = inject(ComponentService);

  protected readonly statuses: IStatus[] = [];
  protected readonly statusStringify = statusStringify;
  protected searchTrigger = output<SearchComponentReq>();


  searchForm = new FormGroup<SearchFormControls>({
    componentCode: new FormControl(null),
    componentName: new FormControl(null),
    effectiveDateFrom: new FormControl(null),
    effectiveDateTo: new FormControl(null),
    endEffectiveDateFrom: new FormControl(null),
    endEffectiveDateTo: new FormControl(null),
    checkToken: new FormControl(null),
    status: new FormControl(null)
  });

  protected readonly checkTokens = Object.values(CheckTokenMap);
  protected readonly checkTokenStringify = checkTokenStringify;

  isHiddenMoreFilters = true;
  moreFiltersLabel = 'More filters';

  protected toggleMoreFilters(): void {
    this.isHiddenMoreFilters = !this.isHiddenMoreFilters;
    this.moreFiltersLabel = this.isHiddenMoreFilters ? 'More filters' : 'Hide more filters';
    console.log();
  }

  protected searchComponents(): void {
    const formValue = this.searchForm.value;
    const criteria = { ...formValue, status: formValue.status?.value } as SearchComponentReq;
    this.searchTrigger.emit(criteria);
  }

}
