import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx-js-style';

const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  public export(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const headerStyle: XLSX.CellStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'center' },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } },
      }
    }
    this.setHeaderStyles(worksheet, headerStyle);

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName + EXCEL_EXTENSION);
  }

  private setHeaderStyles(worksheet: XLSX.WorkSheet, headerStyle: XLSX.CellStyle): void {
    const range = XLSX.utils.decode_range(worksheet['!ref'] || '');

    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!worksheet[cellAddress]) continue;
      worksheet[cellAddress].s = headerStyle;
    }
  }
}
