import { AsyncPipe } from '@angular/common';
import { Component, inject, INJECTOR } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { type TuiFileLike, TuiFiles, TuiInputFilesDirective, TuiFilesComponent } from '@taiga-ui/kit';
import { finalize, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ComponentPreviewModal } from '../../features/component/component-preview-modal/component-preview-modal';
import { TuiDialogService } from '@taiga-ui/core/components/dialog';

@Component({
  selector: 'app-input-file',
  imports: [TuiInputFilesDirective, ɵInternalFormsSharedModule, ReactiveFormsModule, TuiFilesComponent, TuiFiles, AsyncPipe],
  templateUrl: './input-file.html',
  styleUrl: './input-file.css',
})
export class InputFile {
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

    return of(file).pipe(
      tap(file => this.openPreviewDialog(file as File)),
      finalize(() => this.loadingFiles.next(null)),
    );
  }

  protected removeFile(): void {
    this.control.setValue(null);
  }

  protected openPreviewDialog(file: File): void {
    this.dialogService.open<any>(new PolymorpheusComponent(ComponentPreviewModal, this.injector), {
      data: file,
      size: 'page',
    }).subscribe();
  }
}
