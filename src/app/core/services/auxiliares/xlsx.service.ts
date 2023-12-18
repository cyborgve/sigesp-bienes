import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivoLista } from '@core/models/auxiliares/activo-lista';
import { convertirObjetoLista } from '@core/utils/funciones/convertir-objeto-lista';
import { DepreciacionLista } from '@core/models/auxiliares/depreciacion-lista';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';
import { ActaPrestamoLista } from '@core/models/auxiliares/acta-prestamo-lista';

@Injectable({
  providedIn: 'root',
})
export class XLSXService {
  listaActasPrestamo(actasPrestamo: ActaPrestamoLista[]): void {
    try {
      const listaActas = this.convertirLista(actasPrestamo);
      const workBook = this.generarLibroDeTrabajo(
        listaActas,
        'Actas de Préstamo'
      );
      const nombreArchivo = this.generarNombreArchivo('actas-prestamo');
      this.guardarArchivo(workBook, nombreArchivo);
    } catch (error) {
      this.handleError(error);
    }
  }

  listaDepreciaciones(depreciaciones: DepreciacionLista[]): void {
    try {
      const lista = this.convertirLista(depreciaciones);
      const workBook = this.generarLibroDeTrabajo(
        lista,
        'Depreciaciones Registradas'
      );
      const nombreArchivo = this.generarNombreArchivo(
        'depreciaciones-registradas'
      );
      this.guardarArchivo(workBook, nombreArchivo);
    } catch (error) {
      this.handleError(error);
    }
  }

  listaDepreciacionesAnualesMensuales(
    depreciaciones: ActivoListaDepreciacion[],
    periodo: 'anuales' | 'mensuales'
  ): void {
    try {
      const listaDepreciaciones = this.convertirLista(depreciaciones);
      const workBook = this.generarLibroDeTrabajo(
        listaDepreciaciones,
        `Depreciaciones ${periodo}`
      );
      const nombreArchivo = this.generarNombreArchivo(
        `depreciaciones-${periodo}`
      );
      this.guardarArchivo(workBook, nombreArchivo);
    } catch (error) {
      this.handleError(error);
    }
  }

  listaInventarioActivos(activos: any[]): void {
    try {
      const listaActivos = this.convertirLista(activos);
      const workBook = this.generarLibroDeTrabajo(
        listaActivos,
        'Inventario de Bienes'
      );
      const nombreArchivo = this.generarNombreArchivo('inventario-activos');
      this.guardarArchivo(workBook, nombreArchivo, {
        compression: true,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  listaActivos(activos: ActivoLista[]): void {
    try {
      const workBook = this.generarLibroDeTrabajo(activos, 'Bienes');
      const nombreArchivo = this.generarNombreArchivo('lista-bienes');
      this.guardarArchivo(workBook, nombreArchivo);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): void {
    console.error('Error:', error);
  }

  private convertirLista(objetos: any[]): any[] {
    return objetos.map(objeto => convertirObjetoLista(objeto));
  }

  private generarLibroDeTrabajo(
    lista: any[],
    nombreHoja: string
  ): XLSX.WorkBook {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(lista);
    XLSX.utils.book_append_sheet(workBook, workSheet, nombreHoja);
    return workBook;
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

  private guardarArchivo(
    workBook: XLSX.WorkBook,
    fileName: string,
    opciones?: XLSX.WritingOptions
  ): void {
    XLSX.writeFile(workBook, fileName, opciones);
  }

  private generarNombreArchivo(nombre: string): string {
    return `sbn_${nombre}_${this.formatearFecha(new Date())}.xlsx`;
  }
}
