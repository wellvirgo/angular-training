import { Component, DestroyRef, inject } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { ComponentFilter } from "../component-filter/component-filter";
import { SearchComponentReq } from '../../../core/dto/component/search-component-req';
import { ComponentService } from '../../../core/service/component/component-service';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DetailComponentRes } from '../../../core/dto/component/component-res';

@Component({
  selector: 'app-component-dashboard',
  imports: [Button, ComponentFilter],
  templateUrl: './component-dashboard.html',
  styleUrl: './component-dashboard.css',
})
export class ComponentDashboard {
  private componentService = inject(ComponentService);
  private destroyRef = inject(DestroyRef);

  protected components: DetailComponentRes[] = [];

  protected search(criteria: SearchComponentReq): void {
    console.log(criteria);
    this.components = [];

    this.componentService.fetchComponents(criteria).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (response) => {
        if (response?.code === '200') {
          this.components = response.data.components;
        }
      },
      error: (error) => {
        console.error('Error fetching components:', error);
      }
    });
  }

}
