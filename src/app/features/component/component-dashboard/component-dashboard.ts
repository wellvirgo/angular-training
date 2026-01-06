import { Component, signal } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { ComponentFilter } from "../component-filter/component-filter";
import { SearchComponentReq } from '../../../core/dto/component/search-component-req';
import { ComponentTable } from "../component-table/component-table";

@Component({
  selector: 'app-component-dashboard',
  imports: [Button, ComponentFilter, ComponentTable],
  templateUrl: './component-dashboard.html',
  styleUrl: './component-dashboard.css',
})
export class ComponentDashboard {
  protected initialSearchCriteria = signal<SearchComponentReq>({});

  protected search(criteria: SearchComponentReq): void {
    this.initialSearchCriteria.update(() => criteria);
  }

}
