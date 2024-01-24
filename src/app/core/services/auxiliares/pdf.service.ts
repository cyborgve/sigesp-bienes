import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmpresaService } from '../otros-modulos/empresa.service';
import { combineLatest } from 'rxjs';
import { InformacionProcesoService } from './informacion-proceso.service';
import { TipoProceso } from '@core/types/tipo-proceso';
import { reporteEntregaUnidad } from '@core/reports/reporte-entrega-unidad';
import { reporteActaPrestamo } from '@core/reports/reporte-acta-prestamo';
import { reporteAutorizacionSalida } from '@core/reports/reporte-autorizacion-salida';
import { reporteCambioResponsable } from '@core/reports/reporte-cambio-responsable';
import { reporteDepreciacion } from '@core/reports/reporte-depreciacion';
import { reporteDesincorporacion } from '@core/reports/reporte-desincorporacion';
import { reporteIncorporacion } from '@core/reports/reporte-incorporacion';
import { reporteModificacion } from '@core/reports/reporte-modificacion';
import { reporteReasignacion } from '@core/reports/reporte-reasignacion';
import { reporteRetorno } from '@core/reports/reporte-reotorno';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class PDFService {
  constructor(
    private _empresa: EmpresaService,
    private _infoReporte: InformacionProcesoService
  ) {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }

  abrirReporte = (proceso: any, tipoProceso: TipoProceso) =>
    combineLatest([
      this._empresa.datosGenerales(proceso.empresaId),
      this._infoReporte.obtener(proceso, tipoProceso),
    ]).pipe(
      tap(([empresa, infoReporte]) => {
        let usuario = 'SIGESP';
        let reportePDF: any;
        switch (tipoProceso) {
          case 'ACTA DE PRÉSTAMO':
            reportePDF = reporteActaPrestamo(empresa, infoReporte, usuario);
            break;
          case 'AUTORIZACIÓN DE SALIDA':
            reportePDF = reporteAutorizacionSalida(
              empresa,
              infoReporte,
              usuario
            );
            break;
          case 'CAMBIO DE RESPONSABLE':
            reportePDF = reporteCambioResponsable(
              empresa,
              infoReporte,
              usuario
            );
            break;
          case 'DEPRECIACIÓN':
            reportePDF = reporteDepreciacion(empresa, infoReporte, usuario);
            break;
          case 'DESINCORPORACIÓN':
            reportePDF = reporteDesincorporacion(empresa, infoReporte, usuario);
            break;
          case 'ENTREGA DE UNIDAD':
            reportePDF = reporteEntregaUnidad(empresa, infoReporte, usuario);
            break;
          case 'INCORPORACIÓN':
            reportePDF = reporteIncorporacion(empresa, infoReporte, usuario);
            break;
          case 'MODIFICACIÓN':
            reportePDF = reporteModificacion(empresa, infoReporte, usuario);
            break;
          case 'REASIGNACIÓN':
            reportePDF = reporteReasignacion(empresa, infoReporte, usuario);
            break;
          case 'RETORNO':
            reportePDF = reporteRetorno(empresa, infoReporte, usuario);
            break;
        }
        pdfMake.createPdf(reportePDF).open();
      }),
      map(() => proceso)
    );

  abrirReporteInventario = (actasPrestamo: any, empresa: Id) => {
    combineLatest([
      this._empresa.datosGenerales(empresa),
      this._infoReporte.listaActasPrestamo(actasPrestamo),
    ]);
  };
}
