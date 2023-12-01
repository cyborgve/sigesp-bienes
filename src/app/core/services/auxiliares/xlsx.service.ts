import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TipoProceso } from '@core/types/tipo-proceso';
import * as XLSX from 'xlsx';
import { InformacionProcesoService } from './informacion-proceso.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { Observable } from 'rxjs';
import { ActivoLista } from '@core/models/auxiliares/activo-lista';
import { convertirObjetoLista } from '@core/utils/funciones/convertir-objeto-lista';
import { DepreciacionLista } from '@core/models/auxiliares/depreciacion-lista';

@Injectable({
  providedIn: 'root',
})
export class XLSXService {
  constructor(private _informacionProceso: InformacionProcesoService) {}

  listaActasPrestamo(actasPrestamo: ActaPrestamo[]): Observable<any> {
    return this._informacionProceso.listaActasPrestamo(actasPrestamo).pipe(
      tap(actasTraducidas => {
        const listaActas = actasTraducidas.map(acta =>
          convertirObjetoLista(acta)
        );
        const workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.json_to_sheet(listaActas);
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Actas de Préstamo');
        const nombreArchivo = this.generarNombreArchivo('actas-prestamo');
        this.guardarArchivo(workBook, nombreArchivo);
      })
    );
  }

  listaDepreciaciones(depreciaciones: DepreciacionLista[]): void {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(depreciaciones);
    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      'Depreciaciones Registradas'
    );
    const nombreArchivo = this.generarNombreArchivo(
      'depreciaciones-reistradas'
    );
    this.guardarArchivo(workBook, nombreArchivo);
  }

  listaDepreciacionesAnualesMensuales(
    depreciaciones: any[],
    periodo: 'anuales' | 'mensuales'
  ): void {
    const listaDepreciaciones = depreciaciones.map(depreciacion =>
      convertirObjetoLista(depreciacion)
    );
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(listaDepreciaciones);
    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      `Lista: Depreciaciones Registradas ${periodo}`
    );
    const nombreArchivo = this.generarNombreArchivo('depreciaciones-anuales');
    this.guardarArchivo(workBook, nombreArchivo);
  }

  listaInventarioActivos(activos: any[]): void {
    const listaActivos = activos.map(activo => convertirObjetoLista(activo));
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(listaActivos);
    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      'Lista: Inventario de Bienes'
    );
    const nombreArchivo = this.generarNombreArchivo('inventario-activos');
    this.guardarArchivo(workBook, nombreArchivo);
  }

  listaActivos(activos: ActivoLista[]): void {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(activos);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Lista: Bienes');
    const nombreArchivo = this.generarNombreArchivo('lista-bienes');
    this.guardarArchivo(workBook, nombreArchivo);
  }

  exportarProceso(
    data: any,
    tipo: TipoProceso,
    activosMultiples: boolean
  ): void {
    this._informacionProceso.obtener(data, tipo).subscribe((proceso: any) => {
      const fileName = this.generarNombreArchivo(tipo);
      const workBook = this.crearWorkBook(proceso);
      if (activosMultiples) this.agregarHojaActivos(workBook, proceso.activos);
      this.guardarArchivo(workBook, fileName);
    });
  }

  private generarNombreArchivo(nombre: string): string {
    return `sbn_${nombre}_${this.formatearFecha(new Date())}.xlsx`;
  }

  private formatearFecha(fecha: Date): string {
    return `${fecha
      .toLocaleString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(', ', '-')}`;
  }

  private crearWorkBook(proceso: any): XLSX.WorkBook {
    const workBook = XLSX.utils.book_new();
    const workSheetProceso = this.crearWorkSheet(proceso);
    XLSX.utils.book_append_sheet(workBook, workSheetProceso, 'Lista de Bienes');
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
