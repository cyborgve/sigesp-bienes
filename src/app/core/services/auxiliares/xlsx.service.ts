import { take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TipoProceso } from '@core/types/tipo-proceso';
import { prepararNombreArchivo } from '@core/utils/funciones/preparar-nombre-archivo';
import * as XLSX from 'xlsx';
import { InformacionProcesoService } from './informacion-proceso.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { Activo } from '@core/models/definiciones/activo';
import { InformacionDefinicionService } from './informacion-definicion.service';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';

@Injectable({
  providedIn: 'root',
})
export class XLSXService {
  constructor(
    private _informacionProceso: InformacionProcesoService,
    private _informacionDefinicion: InformacionDefinicionService
  ) {}

  actasPrestamo(actasPrestamo: ActaPrestamo[]) {
    this._informacionProceso
      .listaActasPrestamo(actasPrestamo)
      .pipe(
        tap(actasTraducidas => {
          let fecha = new Date();
          let workBook = XLSX.utils.book_new();
          let workSheet = XLSX.utils.json_to_sheet(actasTraducidas);
          XLSX.utils.book_append_sheet(
            workBook,
            workSheet,
            'Actas de Préstamo'
          );
          let nombreArchivo = `sbn_actas_prestamo_${String(
            fecha.getDay()
          ).padStart(2, '0')}-${String(fecha.getMonth() + 1).padStart(
            2,
            '0'
          )}-${fecha.getFullYear()}_${String(fecha.getHours()).padStart(
            2,
            '0'
          )}-${String(fecha.getMinutes()).padStart(2, '0')}-${String(
            fecha.getSeconds()
          ).padStart(2, '0')}.xlsx`;
          XLSX.writeFile(workBook, nombreArchivo);
        }),
        take(1)
      )
      .subscribe();
  }

  depreciacionesAnuales(depreciaciones: any[]) {
    let fecha = new Date();
    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.json_to_sheet(depreciaciones);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Depreciaciones');
    let nombreArchivo = `sbn_depreciaciones_${String(fecha.getDay()).padStart(
      2,
      '0'
    )}-${String(fecha.getMonth() + 1).padStart(
      2,
      '0'
    )}-${fecha.getFullYear()}_${String(fecha.getHours()).padStart(
      2,
      '0'
    )}-${String(fecha.getMinutes()).padStart(2, '0')}-${String(
      fecha.getSeconds()
    ).padStart(2, '0')}.xlsx`;
    XLSX.writeFile(workBook, nombreArchivo);
  }

  inventarioActivos(activos: any[]) {
    let fecha = new Date();
    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.json_to_sheet(activos);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Activos');
    let nombreArchivo = `sbn_inventario_activos_${String(
      fecha.getDay()
    ).padStart(2, '0')}-${String(fecha.getMonth() + 1).padStart(
      2,
      '0'
    )}-${fecha.getFullYear()}_${String(fecha.getHours()).padStart(
      2,
      '0'
    )}-${String(fecha.getMinutes()).padStart(2, '0')}-${String(
      fecha.getSeconds()
    ).padStart(2, '0')}.xlsx`;
    XLSX.writeFile(workBook, nombreArchivo);
  }

  exportarProceso(
    data: any,
    tipo: TipoProceso,
    activosMultiples: boolean
  ): void {
    this._informacionProceso.obtener(data, tipo).subscribe((proceso: any) => {
      const fileName = this.generarNombreArchivo(tipo, data.comprobante);
      const workBook = this.crearWorkBook(proceso);
      if (activosMultiples) this.agregarHojaActivos(workBook, proceso.activos);
      this.guardarArchivo(workBook, fileName);
    });
  }

  listaActivos(activos: Activo[]) {
    let fecha = new Date();
    let ids = activos.map(activo => activo.id);
    this._informacionDefinicion
      .obtenerActivos(ids)
      .pipe(
        tap(activos => {
          let workBook = XLSX.utils.book_new();
          let workSheet = XLSX.utils.json_to_sheet(activos);
          XLSX.utils.book_append_sheet(workBook, workSheet, 'Activos');
          let nombreArchivo = `sbn_listado-activos_${String(
            fecha.getDay()
          ).padStart(2, '0')}-${String(fecha.getMonth() + 1).padStart(
            2,
            '0'
          )}-${fecha.getFullYear()}_${String(fecha.getHours()).padStart(
            2,
            '0'
          )}-${String(fecha.getMinutes()).padStart(2, '0')}-${String(
            fecha.getSeconds()
          ).padStart(2, '0')}.xlsx`;
          XLSX.writeFile(workBook, nombreArchivo);
        }),
        take(1)
      )
      .subscribe();
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
