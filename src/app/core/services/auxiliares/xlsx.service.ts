import { Injectable } from '@angular/core';
import { TipoProceso } from '@core/types/tipo-proceso';
import { prepararNombreArchivo } from '@core/utils/funciones/preparar-nombre-archivo';
import * as XLSX from 'xlsx';
import { InformacionProcesoService } from './informacion-proceso.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';

@Injectable({
  providedIn: 'root',
})
export class XLSXService {
  constructor(private _informacionProceso: InformacionProcesoService) {}

  exportarProcesoExcel(data: any, tipo: TipoProceso): void {
    this._informacionProceso.obtener(data, tipo).subscribe((proceso: any) => {
      const fileName = this.generarNombreArchivo(tipo, data.comprobante);
      const workBook = this.crearWorkBook(proceso);
      this.agregarHojaActivos(workBook, proceso.activos);
      this.guardarArchivo(workBook, fileName);
    });
  }

  private generarNombreArchivo(tipo: TipoProceso, comprobante: string): string {
    return `sbn_${prepararNombreArchivo(tipo)}_${comprobante.substring(
      5
    )}.xlsx`;
  }

  private crearWorkBook(proceso: any): XLSX.WorkBook {
    const workBook = XLSX.utils.book_new();
    const workSheetProceso = this.crearWorkSheet(proceso);
    XLSX.utils.book_append_sheet(workBook, workSheetProceso, 'Datos Generales');
    return workBook;
  }

  private crearWorkSheet(data: any): XLSX.WorkSheet {
    return XLSX.utils.json_to_sheet([data]);
  }

  private agregarHojaActivos(
    workBook: XLSX.WorkBook,
    activos: ActivoProceso[]
  ): void {
    const workSheetActivos = this.crearWorkSheetActivos(activos);
    XLSX.utils.book_append_sheet(workBook, workSheetActivos, 'Activos');
  }

  private crearWorkSheetActivos(activos: ActivoProceso[]): XLSX.WorkSheet {
    return XLSX.utils.json_to_sheet(activos);
  }

  private guardarArchivo(workBook: XLSX.WorkBook, fileName: string): void {
    XLSX.writeFile(workBook, fileName);
  }
}
