import { Component, output } from '@angular/core';
import { TuiDataList, TuiDropdown, TuiDropdownDirective, TuiTextfield, tuiDateFormatProvider, TuiLink } from "@taiga-ui/core";
import { Button } from "../../../shared/button/button";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiSearch, TuiForm } from '@taiga-ui/layout';
import { TuiInputDate, TuiChevron, TuiDataListWrapper, TuiSelect } from "@taiga-ui/kit";
import { ComponentStatusMap, statusStringify } from '../../../core/enums/component-status.enum';
import { SearchComponentReq } from '../../../core/dto/component/component-req';
import { CheckTokenMap, checkTokenStringify } from '../../../core/enums/component-check-token.enum';

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
  protected readonly statuses = Object.values(ComponentStatusMap);

  protected readonly checkTokenStringify = checkTokenStringify;
  protected readonly statusStringify = statusStringify;

  isHiddenMoreFilters = true;
  moreFiltersLabel = 'More filters';

  protected toggleMoreFilters(): void {
    this.isHiddenMoreFilters = !this.isHiddenMoreFilters;
    this.moreFiltersLabel = this.isHiddenMoreFilters ? 'More filters' : 'Hide more filters';
    console.log();
  }

  protected searchComponents(): void {
    const criteria = this.searchForm.value as SearchComponentReq;
    this.searchTrigger.emit(criteria);
  }

}
