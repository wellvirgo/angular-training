import { DatePipe } from '@angular/common';
import { Component, inject, Inject, signal } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, GridApi, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-component-preview-modal',
  imports: [AgGridAngular],
  templateUrl: './component-preview-modal.html',
  styleUrl: './component-preview-modal.css',
})
export class ComponentPreviewModal {
  private gridApi!: GridApi;
  private datePipe = inject(DatePipe);

  constructor(@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, any[]>) { }

  paginationPageSizeSelector: number[] = [20, 50, 100];
  paginationPageSize = signal(this.paginationPageSizeSelector[0]);

  rowData: any[] = [];

  colDefsDefault: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  }

  colDefs: ColDef[] = [
    { field: '#', valueGetter: 'node.rowIndex + 1', maxWidth: 70, pinned: 'left' },
    { field: 'Component Code', headerName: 'Component Code', maxWidth: 170, pinned: 'left' },
    { field: 'Component Name', headerName: 'Component Name' },
    { field: 'Effective Date', headerName: 'Effective Date', valueFormatter: params => this.datePipe.transform(params.value, 'yyyy-MM-dd') || '' },
    { field: 'End Effective Date', headerName: 'End Effective Date', valueFormatter: params => this.datePipe.transform(params.value, 'yyyy-MM-dd') || '' },
    { field: 'Message Type', headerName: 'Message Type' },
    { field: 'Connection Method', headerName: 'Connection Method' },
    { field: 'Status', headerName: 'Status' },
  ];

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
    this.rowData = this.context.data;
    this.gridApi.setGridOption('rowData', this.rowData);
  }

}
