import { Injectable } from '@angular/core';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { TipoProceso } from '@core/types/tipo-proceso';
import { prepararNombreArchivo } from '@core/utils/funciones/preparar-nombre-archivo';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class XLSXService {
  exportarProcesoExcel(
    data: any,
    proceso: TipoProceso,
    comprobante: string
  ): void {
    let fileName = `sbn_${prepararNombreArchivo(proceso)}_${comprobante}.xlsx`;
    let workBook = XLSX.utils.book_new();
    let parseWorkSheet = () => XLSX.utils.json_to_sheet(data);
    let writeFile = (fileName: string) => XLSX.writeFile(workBook, fileName);
    let appendWorkSheet = (workSheet: XLSX.WorkSheet) =>
      XLSX.utils.book_append_sheet(workBook, workSheet);
    appendWorkSheet(parseWorkSheet());
    writeFile(fileName);
  }
}
