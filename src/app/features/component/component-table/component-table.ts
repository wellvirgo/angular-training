import { Component, effect, inject, input, signal } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, AllCommunityModule, ModuleRegistry, IDatasource, IGetRowsParams, GridApi, GridReadyEvent } from "ag-grid-community";
import { SearchComponentReq, SearchComponentReqWithPagination } from '../../../core/dto/component/component-req';
import { ComponentService } from '../../../core/service/component/component-service';
import { statusStringify } from '../../../core/enums/component-status.enum';
import { ButtonGrid } from '../../../shared/button-grid/button-grid';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-component-table',
  imports: [AgGridAngular],
  templateUrl: './component-table.html',
  styleUrl: './component-table.css',
})
export class ComponentTable {
  private componentService = inject(ComponentService);

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
    { field: '#', valueGetter: 'node.rowIndex + 1', maxWidth: 70 },
    { field: 'componentCode', headerName: 'Component Code' },
    { field: 'componentName', headerName: 'Component Name' },
    { field: 'effectiveDate', headerName: 'Effective Date' },
    { field: 'endEffectiveDate', headerName: 'End Effective Date' },
    { field: 'status', headerName: 'Status', valueFormatter: (params) => statusStringify(params.value) },
    { field: 'id', headerName: 'Actions', cellRenderer: ButtonGrid }
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
}
