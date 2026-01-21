import { DatePipe } from '@angular/common';
import { Component, inject, Inject, signal } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, GridApi, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';
import { ProgressBar } from "../../../shared/progress-bar/progress-bar";
import { ComponentService } from '../../../core/service/component/component-service';
import { ExcelImport } from '../../../core/service/import/excel-import';
import { map } from 'rxjs';
import { ImportStatus } from '../../../core/enums/import-status';
import { NotifyService } from '../../../shared/notification/notify-service';
import { ErrorReportDownloadService } from '../../../core/service/import/error-report-download-service';
import { ImportComponentRes } from '../../../core/dto/component/import-res';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-component-preview-modal',
  imports: [AgGridAngular, ProgressBar],
  templateUrl: './component-preview-modal.html',
  styleUrl: './component-preview-modal.css',
})
export class ComponentPreviewModal {
  private gridApi!: GridApi;
  private datePipe = inject(DatePipe);
  private readonly componentService = inject(ComponentService);
  private readonly excelImportService = inject(ExcelImport);
  private readonly notificationService = inject(NotifyService);
  private readonly errorReportDownloadService = inject(ErrorReportDownloadService);

  constructor(@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, File>) { }

  protected isImporting = signal(false);
  protected maxValueProgressBar = signal(100);

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

    const file: File = this.context.data;
    this.excelImportService.readFile(file).subscribe({
      next: data => {
        this.rowData = data;
        this.gridApi.setGridOption('rowData', this.rowData);
        this.importComponents(file);
      }
    });
  }

  importComponents(file: File): void {
    this.isImporting.update(() => true);
    this.componentService.importComponentsFromExcel(file)
      .pipe(
        map(response => response.data)
      )
      .subscribe({
        next: data => {
          this.maxValueProgressBar.update(() => 100);
          this.componentService.changeHaveImported(true);
          setTimeout(() => {
            this.isImporting.update(() => false);
          }, 1000);
          this.showDialogByStatus(data);
        },
        error: errResponse => {
          console.log(errResponse);
          const errorMsg = errResponse.error ? `Component import failed: ${errResponse.error.message}` : 'Component import failed due to errors.';
          this.notificationService.notifyError("Import Failed", errorMsg, 5000);
        }
      });
  }

  showDialogByStatus(data: ImportComponentRes): void {
    switch (data.status) {
      case ImportStatus.COMPLETE: {
        this.notificationService.notifySuccess("Import Complete", `${data.success} rows imported successfully.`, 5000);
        break;
      }
      case ImportStatus.COMPLETE_WITH_ERROR: {
        this.notificationService.showConfirmDialog("Import completed with Errors",
          `<span class="success-count">${data.success}</span> rows imported successfully, <span class="failed-count">${data.failed}</span> rows failed to import. Do you want to download the error report?`,
          () => {
            this.errorReportDownloadService.downloadErrorReport(data.errorReportName ?? '')
              .subscribe({
                next: response => {
                  if (response.body) {
                    this.componentService.dowloadFile(response.body, data.errorReportName ?? 'error-report.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                  }
                }
              });
          });
        break;
      }
      default: {
        this.notificationService.notifyError("Import Failed", "Component import failed due to errors.", 5000);
      }
    }
  }
}
