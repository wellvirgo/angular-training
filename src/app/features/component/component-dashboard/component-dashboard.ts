import { Component, inject, signal } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { ComponentFilter } from "../component-filter/component-filter";
import { SearchComponentReq } from '../../../core/dto/component/component-req';
import { ComponentTable } from "../component-table/component-table";
import { Router } from "@angular/router";

@Component({
  selector: 'app-component-dashboard',
  imports: [Button, ComponentFilter, ComponentTable],
  templateUrl: './component-dashboard.html',
  styleUrl: './component-dashboard.css',
})
export class ComponentDashboard {
  private router = inject(Router);

  protected initialSearchCriteria = signal<SearchComponentReq>({});

  protected search(criteria: SearchComponentReq): void {
    this.initialSearchCriteria.update(() => criteria);
  }

  protected toAddPage(): void {
    this.router.navigate(['/components/add']);
  }
}
