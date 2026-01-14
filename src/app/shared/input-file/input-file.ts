import { AsyncPipe } from '@angular/common';
import { Component, inject, INJECTOR } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { type TuiFileLike, TuiFiles, TuiInputFilesDirective, TuiFilesComponent } from '@taiga-ui/kit';
import { finalize, map, Observable, of, Subject, switchMap, tap, timer } from 'rxjs';
import { ExcelImport } from '../../core/service/import/excel-import';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ComponentPreviewModal } from '../../features/component/component-preview-modal/component-preview-modal';

@Component({
  selector: 'app-input-file',
  imports: [TuiInputFilesDirective, ɵInternalFormsSharedModule, ReactiveFormsModule, TuiFilesComponent, TuiFiles, AsyncPipe],
  templateUrl: './input-file.html',
  styleUrl: './input-file.css',
})
export class InputFile {
  private readonly excelImportService = inject(ExcelImport);
  private readonly injector = inject(INJECTOR);
  private readonly dialogService = inject(TuiDialogService);

  protected readonly EXCEL_EXPECTED = '.xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';

  protected control = new FormControl<TuiFileLike | null>(null, Validators.required);

  protected failedFiles = new Subject<TuiFileLike | null>();
  protected loadingFiles = new Subject<TuiFileLike | null>();
  protected loadedFiles = this.control.valueChanges.pipe(
    switchMap(file => this.processFile(file))
  );

  public processFile(file: TuiFileLike | null): Observable<TuiFileLike | null> {
    this.failedFiles.next(null);

    if (this.control.invalid || !file) {
      return of(null);
    }

    this.loadingFiles.next(file);

    return this.excelImportService.readFile(file as File).pipe(
      tap(data => this.openPreviewDialog(data)),
      map(() => file),
      finalize(() => this.loadingFiles.next(null))
    )
  }

  protected removeFile(): void {
    this.control.setValue(null);
  }

  protected openPreviewDialog(data: any[]): void {
    this.dialogService.open<any[]>(new PolymorpheusComponent(ComponentPreviewModal, this.injector), {
      data: data,
      size: 'page',
    }).subscribe();
  }
}
