import { Component, effect, inject, input, signal } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, AllCommunityModule, ModuleRegistry, IDatasource, IGetRowsParams, GridApi, GridReadyEvent } from "ag-grid-community";
import { SearchComponentReq, SearchComponentReqWithPagination } from '../../../core/dto/component/component-req';
import { ComponentService } from '../../../core/service/component/component-service';
import { statusStringify } from '../../../core/enums/component-status.enum';
import { ButtonGrid } from '../../../shared/button-grid/button-grid';
import { Router } from '@angular/router';
import { NotifyService } from '../../../shared/notification/notify-service';
import { filter, map } from 'rxjs';
import { Button } from "../../../shared/button/button";
import { ExcelService } from '../../../core/service/export/excel-service';
import { TuiLoader } from '@taiga-ui/core';
import { InputFile } from "../../../shared/input-file/input-file";
import { msgTypeStringify } from '../../../core/dto/message-type/message-type-res';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-component-table',
  imports: [AgGridAngular, Button, TuiLoader, InputFile],
  templateUrl: './component-table.html',
  styleUrl: './component-table.css',
})
export class ComponentTable {
  private componentService = inject(ComponentService);
  private notifyService = inject(NotifyService);
  private excelService = inject(ExcelService);
  private router = inject(Router);

  private refreshAfterImport = effect(() => {
    const currentCriteria = this.criteria();
    if (this.componentService.haveImported()) {
      console.log("here");
      this.updateDataSource(currentCriteria);
      this.componentService.changeHaveImported(false);
    }
  });

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
    { field: 'messageType', headerName: 'Message Type', valueFormatter: (params) => msgTypeStringify(params.value) },
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

  protected isExporting = signal(false);

  exportTemplate() {
    let data: any[] = [];
    const limit = 10
    this.gridApi.forEachNode((node) => {
      if (data.length >= limit) {
        return;
      }

      if (node.data) {
        data.push({
          'Component Code': node.data.componentCode,
          'Component Name': node.data.componentName,
          'Effective Date': node.data.effectiveDate,
          'End Effective Date': node.data.endEffectiveDate,
          'Message Type': node.data.messageType,
          'Connection Method': node.data.connectionMethod,
          'Status': statusStringify(node.data.status)
        });
      }
    });
    this.excelService.export(data, `template`);
  }

  exportToExcelInBackEnd() {
    this.isExporting.set(true);
    this.componentService.exportComponentsToExcel(this.criteria()).subscribe({
      next: (response) => {
        const fileName = `components_export_${new Date().getTime()}.xlsx`;
        this.isExporting.set(false);
        if (response.body) {
          this.componentService.dowloadFile(response.body, fileName, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        }
      },
      error: (error) => {
        this.notifyService.notifyError('Error exporting to Excel', 'An unexpected error occurred while exporting components to Excel.', 5000);
      }
    });
  }
}
