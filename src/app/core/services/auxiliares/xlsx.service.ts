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
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class XLSXService {
  constructor(
    private _informacionProceso: InformacionProcesoService,
    private _informacionDefinicion: InformacionDefinicionService
  ) {}

  listaActasPrestamo(actasPrestamo: ActaPrestamo[]): Observable<any> {
    return this._informacionProceso.listaActasPrestamo(actasPrestamo).pipe(
      tap(actasTraducidas => {
        let fecha = new Date();
        let workBook = XLSX.utils.book_new();
        let workSheet = XLSX.utils.json_to_sheet(actasTraducidas);
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Actas de Préstamo');
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
      })
    );
  }

  listaDepreciaciones(depreciaciones: Depreciacion[]): Observable<any> {
    return this._informacionProceso.listaDepreciaciones(depreciaciones).pipe(
      tap(depreciacionesTraducidas => {
        let fecha = new Date();
        let workBook = XLSX.utils.book_new();
        let workSheet = XLSX.utils.json_to_sheet(depreciacionesTraducidas);
        XLSX.utils.book_append_sheet(
          workBook,
          workSheet,
          'Depreciaciones Registradas'
        );
        let nombreArchivo = `sbn_depreciaciones_registradas_${String(
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
      })
    );
  }

  listaDepreciacionesAnualesMensuales(
    depreciaciones: any[],
    periodo: 'anuales' | 'mensuales'
  ) {
    let generar = () => {
      let fecha = new Date();
      let workBook = XLSX.utils.book_new();
      let workSheet = XLSX.utils.json_to_sheet(depreciaciones);
      XLSX.utils.book_append_sheet(
        workBook,
        workSheet,
        'Lista: Depreciaciones Registradas' + periodo
      );
      let nombreArchivo = `sbn_depreciaciones_registradas_${periodo}_${String(
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
    };
    return of(generar());
  }

  listaInventarioActivos(activos: any[]) {
    let generar = () => {
      let fecha = new Date();
      let workBook = XLSX.utils.book_new();
      let workSheet = XLSX.utils.json_to_sheet(activos);
      XLSX.utils.book_append_sheet(
        workBook,
        workSheet,
        'Lista: Inventario de Bienes'
      );
      let nombreArchivo = `sbn_inventario_bienes_${String(
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
    };
    return of(generar());
  }

  listaActivos(activos: Activo[]) {
    let generar = () => {
      let fecha = new Date();
      let workBook = XLSX.utils.book_new();
      let workSheet = XLSX.utils.json_to_sheet(activos);
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Lista: Bienes');
      let nombreArchivo = `sbn_lista_bienes_${String(fecha.getDay()).padStart(
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
    };
    return of(generar());
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
