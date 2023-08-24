import { tap, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { TipoProceso } from '@core/types/tipo-proceso';
import { prepararNombreArchivo } from '@core/utils/funciones/preparar-nombre-archivo';
import * as XLSX from 'xlsx';
import { InformacionProcesoService } from './informacion-proceso.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class XLSXService {
  constructor(private _informacionProceso: InformacionProcesoService) {}

  exportarProcesoExcel(
    data: any,
    tipo: TipoProceso,
    comprobante: string
  ): void {
    this._informacionProceso
      .obtener(data, tipo)
      .pipe(
        tap((proceso: any) => {
          let fileName = `sbn_${prepararNombreArchivo(
            tipo
          )}_${comprobante}.xlsx`;
          let workBook = XLSX.utils.book_new();
          let parseWorkSheet = () => XLSX.utils.json_to_sheet([proceso]);
          let writeFile = (fileName: string) =>
            XLSX.writeFile(workBook, fileName);
          let appendWorkSheet = (workSheet: XLSX.WorkSheet) => {
            return XLSX.utils.book_append_sheet(workBook, workSheet);
          };
          appendWorkSheet(parseWorkSheet());
          writeFile(fileName);
        }),
        first()
      )
      .subscribe();
  }
}
