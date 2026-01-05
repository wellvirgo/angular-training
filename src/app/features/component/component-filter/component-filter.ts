import { Component } from '@angular/core';
import { TuiDataList, TuiDropdown, TuiDropdownDirective, TuiTextfield, tuiDateFormatProvider, TuiLink } from "@taiga-ui/core";
import { Button } from "../../../shared/button/button";
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TuiSearch, TuiForm } from '@taiga-ui/layout';
import { TuiInputDate, TuiChevron, TuiDataListWrapper, TuiSelect } from "@taiga-ui/kit";
import { TuiStringHandler } from '@taiga-ui/cdk/types';
import { ComponentStatus, ComponentStatusMap } from '../../../core/enums/component-status.enum';
import { SearchComponentReq } from '../../../core/dto/search-component-req';

interface CheckToken {
  value: string;
  label: string;
}

interface Status {
  value: number;
  label: string;
}

type SearchFormControls = {
  [K in keyof SearchComponentReq]: FormControl<SearchComponentReq[K] | null>;
};

@Component({
  selector: 'app-component-filter',
  imports: [TuiTextfield, TuiSearch, TuiInputDate, TuiDataListWrapper, TuiDataList, TuiDropdown, TuiSelect,
    Button, ReactiveFormsModule, TuiForm, TuiDropdownDirective, TuiChevron, TuiLink],
  templateUrl: './component-filter.html',
  styleUrl: './component-filter.css',
  providers: [tuiDateFormatProvider({ mode: "DMY", separator: "-" })],
})
export class ComponentFilter {
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

  protected readonly checkTokens: CheckToken[] = [
    { value: 'Y', label: 'Yes' },
    { value: 'N', label: 'No' }
  ];

  protected readonly statuses: Status[] = [
    { value: ComponentStatusMap[ComponentStatus.NEW].value, label: ComponentStatusMap[ComponentStatus.NEW].label },
    { value: ComponentStatusMap[ComponentStatus.PENDING].value, label: ComponentStatusMap[ComponentStatus.PENDING].label },
    { value: ComponentStatusMap[ComponentStatus.APPROVED].value, label: ComponentStatusMap[ComponentStatus.APPROVED].label },
    { value: ComponentStatusMap[ComponentStatus.REJECTED].value, label: ComponentStatusMap[ComponentStatus.REJECTED].label },
    { value: ComponentStatusMap[ComponentStatus.CANCELLED].value, label: ComponentStatusMap[ComponentStatus.CANCELLED].label },
  ];

  protected readonly checkTokenStringify: TuiStringHandler<string> = (value) => this.checkTokens.find(item => item.value === value)?.label || '';
  protected readonly statusStringify: TuiStringHandler<number> = (value) => this.statuses.find(item => item.value === value)?.label || '';

  isHiddenMoreFilters = true;
  moreFiltersLabel = 'More filters';

  protected toggleMoreFilters(): void {
    this.isHiddenMoreFilters = !this.isHiddenMoreFilters;
    this.moreFiltersLabel = this.isHiddenMoreFilters ? 'More filters' : 'Hide more filters';
    console.log();
  }

  protected searchComponents(): void {
    console.log('Search components with filters:', this.searchForm.value);
  }

}
