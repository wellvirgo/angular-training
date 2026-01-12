import { Component, effect, inject, input, output, signal } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, AllCommunityModule, ModuleRegistry, IDatasource, IGetRowsParams, GridApi, GridReadyEvent } from "ag-grid-community";
import { SearchComponentReq, SearchComponentReqWithPagination } from '../../../core/dto/component/component-req';
import { ComponentService } from '../../../core/service/component/component-service';
import { statusStringify } from '../../../core/enums/component-status.enum';
import { ButtonGrid } from '../../../shared/button-grid/button-grid';
import { Router } from '@angular/router';
import { NotifyService } from '../../../shared/notification/notify-service';
import { filter, map } from 'rxjs';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-component-table',
  imports: [AgGridAngular],
  templateUrl: './component-table.html',
  styleUrl: './component-table.css',
})
export class ComponentTable {
  private componentService = inject(ComponentService);
  private notifyService = inject(NotifyService);
  private router = inject(Router);

  criteria = input<SearchComponentReq>({});

  constructor() {
    effect(() => {
      const currentCriteria = this.criteria();
      if (this.gridApi) {
        this.updateDataSource(currentCriteria);
      }
    });
  }

  private gridApi!: GridApi;

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  colDefs: ColDef[] = [
    { field: '#', valueGetter: 'node.rowIndex + 1', maxWidth: 70, pinned: 'left' },
    { field: 'componentCode', headerName: 'Component Code', maxWidth: 170, pinned: 'left' },
    { field: 'componentName', headerName: 'Component Name' },
    { field: 'effectiveDate', headerName: 'Effective Date' },
    { field: 'endEffectiveDate', headerName: 'End Effective Date' },
    { field: 'messageType', headerName: 'Message Type' },
    { field: 'connectionMethod', headerName: 'Connection Method' },
    { field: 'status', headerName: 'Status', valueFormatter: (params) => statusStringify(params.value) },
    {
      field: 'id', headerName: 'Actions', maxWidth: 100, pinned: 'right', cellRenderer: ButtonGrid, cellRendererParams: {
        updateButtonClick: this.updateComponent.bind(this),
        deleteButtonClick: this.confirmDelete.bind(this),
      }
    }
  ];

  paginationPageSizeSelector: number[] = [20, 50, 100];
  paginationPageSize = signal(this.paginationPageSizeSelector[0]);



  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
    this.updateDataSource(this.criteria());
  }

  private updateDataSource(criteria: SearchComponentReq): void {
    const datasource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        const page = Math.floor(params.startRow / this.paginationPageSize()) + 1;
        const searchReq: SearchComponentReqWithPagination = {
          ...criteria,
          page: page,
          size: this.paginationPageSize()
        };

        this.componentService.fetchComponents(searchReq)
          .subscribe({
            next: (response) => {
              params.successCallback(response.data.components, response.data.totalElements);
            },
            error: (error) => {
              console.log('Error fetching components', error);
              params.failCallback();
            }
          });
      }
    };
    this.gridApi.setGridOption('datasource', datasource);

  }

  updateComponent(id: string | number) {
    this.router.navigate(['/components/update', id,])
  }

  private deleteComponent(id: string | number) {
    if (Number.isNaN(id)) return;
    this.componentService.deleteComponent(Number(id))
      .pipe(
        filter(httpResponse => httpResponse.ok),
        map((httpResponse) => httpResponse.body),
        filter(responseBody => responseBody?.code === '200')
      )
      .subscribe({
        next: () => {
          this.notifyService.notifySuccess(undefined, 'Component deleted successfully.', 3500);
          this.gridApi.refreshInfiniteCache();
        },
        error: (error) => {
          let message = 'An unexpected error occurred while deleting the component.';
          if (error.status === 401) {
            message = 'You are not authorized to delete this component.';
          }
          this.notifyService.notifyError('Error deleting component', message, 5000);
        }
      });
  }

  confirmDelete(id: string | number) {
    this.notifyService.showConfirmDialog('Delete Component', 'Are you sure you want to delete this component?', () => this.deleteComponent(id));
  }
}
