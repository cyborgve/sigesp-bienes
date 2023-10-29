import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmpresaService } from '../otros-modulos/empresa.service';
import { combineLatest } from 'rxjs';
import { InformacionProcesoService } from './informacion-proceso.service';
import { TipoProceso } from '@core/types/tipo-proceso';
import { reporteEntregaUnidad } from '@core/reportes/reporte-entrega-unidad';
import { reporteActaPrestamo } from '@core/reportes/reporte-acta-prestamo';
import { reporteAutorizacionSalida } from '@core/reportes/reporte-autorizacion-salida';
import { reporteCambioResponsable } from '@core/reportes/reporte-cambio-responsable';
import { reporteDepreciacion } from '@core/reportes/reporte-depreciacion';
import { reporteDesincorporacion } from '@core/reportes/reporte-desincorporacion';
import { reporteIncorporacion } from '@core/reportes/reporte-incorporacion';
import { reporteModificacion } from '@core/reportes/reporte-modificacion';
import { reporteReasignacion } from '@core/reportes/reporte-reasignacion';
import { reporteRetorno } from '@core/reportes/reporte-reotorno';

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

  // abrirReportePDFEntregaUnidad(entregaUnidad: EntregaUnidad) {
  //   combineLatest([
  //     this._empresa.datosGenerales(entregaUnidad.empresaId),
  //     this._infoReporte.obtener(entregaUnidad, 'ENTREGA DE UNIDAD'),
  //   ])
  //     .pipe(
  //       tap(([empresa, infoReporte]) => {
  //         let reportePDF = {
  //           pageSize: 'letter',
  //           pageOrientation: 'portrait',
  //           info: metadataReporte(
  //             infoReporte,
  //             'ENTREGA DE UNIDAD',
  //             this._sigesp.usuarioActivo
  //           ),
  //           footer: seccionPiePaginaReporte(infoReporte, 'ENTREGA DE UNIDAD'),
  //           content: [
  //             seccionEncabezadoReporte(
  //               empresa,
  //               infoReporte,
  //               'ENTREGA DE UNIDAD'
  //             ),
  //             seccionDatosGeneralesReporte(infoReporte, 'ENTREGA DE UNIDAD'),
  //           ],
  //           styles: this.estilosProceso,
  //         };
  //         pdfMake
  //           .createPdf(
  //             reporteEntregaUnidad(
  //               empresa,
  //               infoReporte,
  //               this._sigesp.usuarioActivo
  //             )
  //           )
  //           .open();
  //       }),
  //       take(1)
  //     )
  //     .subscribe();
  // }

  // abrirReportePDFModificacion(modificacion: Modificacion) {
  //   combineLatest([
  //     this._empresa.datosGenerales(modificacion.empresaId),
  //     this._infoReporte.obtener(modificacion, 'DEPRECIACIÓN'),
  //   ])
  //     .pipe(
  //       tap(([empresa, infoReporte]) => {
  //         let reportePDF = {
  //           pageSize: 'letter',
  //           pageOrientation: 'portrait',
  //           info: metadataReporte(
  //             infoReporte,
  //             'DEPRECIACIÓN',
  //             this._sigesp.usuarioActivo
  //           ),
  //           footer: seccionPiePaginaReporte(infoReporte, 'DEPRECIACIÓN'),
  //           content: [
  //             seccionEncabezadoReporte(empresa, infoReporte, 'DEPRECIACIÓN'),
  //             seccionDatosGeneralesReporte(infoReporte, 'DEPRECIACIÓN'),
  //             seccionDetallesModificacionReporte(infoReporte),
  //           ],
  //           styles: this.estilosProceso,
  //         };
  //         pdfMake.createPdf(reportePDF).open();
  //       })
  //     )
  //     .subscribe();
  // }

  // abrirReportePDFDepreciacion(depreciacion: Depreciacion) {
  //   combineLatest([
  //     this._empresa.datosGenerales(depreciacion.empresaId),
  //     this._infoReporte.obtener(depreciacion, 'DEPRECIACIÓN'),
  //   ])
  //     .pipe(
  //       tap(([empresa, infoReporte]) => {
  //         let reportePDF = {
  //           pageSize: 'letter',
  //           pageOrientation: 'portrait',
  //           info: metadataReporte(
  //             infoReporte,
  //             'DEPRECIACIÓN',
  //             this._sigesp.usuarioActivo
  //           ),
  //           footer: seccionPiePaginaReporte(infoReporte, 'DEPRECIACIÓN'),
  //           content: [
  //             seccionEncabezadoReporte(empresa, infoReporte, 'DEPRECIACIÓN'),
  //             seccionDatosGeneralesReporte(infoReporte, 'DEPRECIACIÓN'),
  //             seccionDetalleDepreciacionReporte(infoReporte),
  //           ],
  //           styles: this.estilosProceso,
  //         };
  //         pdfMake.createPdf(reportePDF).open();
  //       })
  //     )
  //     .subscribe();
  // }
}
