import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import * as XLSX from 'xlsx-js-style';

@Injectable({
  providedIn: 'root',
})
export class ExcelImport {
  public readFile(file: File): Observable<unknown[]> {
    return from(file.arrayBuffer()).pipe(
      map(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
        const sheetNames = workbook.SheetNames;
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      })
    );
  }
}
