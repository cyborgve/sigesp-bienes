import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { tap, take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmpresaService } from '../otros-modulos/empresa.service';
import { Empresa } from '@core/models/otros-modulos/empresa';
import { SigespService } from 'sigesp';
import { combineLatest } from 'rxjs';
import { InformacionProcesoService } from './informacion-proceso.service';
import { TipoProceso } from '@core/types/tipo-proceso';
import { Modificacion } from '@core/models/procesos/modificacion';
import { seccionPiePaginaReporte } from '@core/reportes/secciones/seccion-pie-pagina-reporte';
import { metadataReporte } from '@core/reportes/auxiliares/metadata-reporte';
import { seccionEncabezadoReporte } from '@core/reportes/secciones/seccion-encabezado-reporte';
import { seccionDetallesModificacionReporte } from '@core/reportes/secciones/seccion-detalles-modificacion-reporte';
import { seccionDetalleReporte } from '@core/reportes/secciones/seccion-detalle-reporte';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { seccionDetalleDepreciacionReporte } from '@core/reportes/secciones/seccion-detalle-depreciacion-reporte';
import { entregaUnidadReporte } from '@core/reportes/reporte-entrega-unidad';
import { seccionDatosGeneralesReporte } from '@core/reportes/secciones/seccion-datos-generales-reporte';
import { reporteActaPrestamo } from '@core/reportes/reporte-acta-prestamo';

@Injectable({
  providedIn: 'root',
})
export class PDFService {
  constructor(
    private _empresa: EmpresaService,
    private _sigesp: SigespService,
    private _infoReporte: InformacionProcesoService
  ) {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }

  reporteProceso: { tipoProceso: TipoProceso; reporte: any } = {
    tipoProceso: 'ACTA DE PRÉSTAMO',
    reporte: 'reporteActaPrestamo(empresa, infoReporte, SIGESP)',
  };

  abrirReporte = (proceso: any) =>
    combineLatest([
      this._empresa.datosGenerales(proceso.empresaId),
      this._infoReporte.obtener(proceso, 'ACTA DE PRÉSTAMO'),
    ]).pipe(
      tap(([empresa, infoReporte]) => {
        pdfMake
          .createPdf(reporteActaPrestamo(empresa, infoReporte, 'SIGESP'))
          .open();
      }),
      map(() => proceso)
    );

  abrirReportePDF(proceso: any, tipoProceso: TipoProceso) {
    combineLatest([
      this._empresa.datosGenerales(proceso.empresaId),
      this._infoReporte.obtener(proceso, tipoProceso),
    ])
      .pipe(
        tap(([empresa, infoReporte]) => {
          let reportePDF = this.generarPDF(empresa, infoReporte, tipoProceso);
          pdfMake.createPdf(reportePDF).open();
        }),
        take(1)
      )
      .subscribe();
  }

  abrirReportePDFEntregaUnidad(entregaUnidad: EntregaUnidad) {
    combineLatest([
      this._empresa.datosGenerales(entregaUnidad.empresaId),
      this._infoReporte.obtener(entregaUnidad, 'ENTREGA DE UNIDAD'),
    ])
      .pipe(
        tap(([empresa, infoReporte]) => {
          let reportePDF = {
            pageSize: 'letter',
            pageOrientation: 'portrait',
            info: metadataReporte(
              infoReporte,
              'ENTREGA DE UNIDAD',
              this._sigesp.usuarioActivo
            ),
            footer: seccionPiePaginaReporte(infoReporte, 'ENTREGA DE UNIDAD'),
            content: [
              seccionEncabezadoReporte(
                empresa,
                infoReporte,
                'ENTREGA DE UNIDAD'
              ),
              seccionDatosGeneralesReporte(infoReporte, 'ENTREGA DE UNIDAD'),
            ],
            styles: this.estilosProceso,
          };
          pdfMake
            .createPdf(
              entregaUnidadReporte(
                empresa,
                infoReporte,
                this._sigesp.usuarioActivo
              )
            )
            .open();
        }),
        take(1)
      )
      .subscribe();
  }

  abrirReportePDFModificacion(modificacion: Modificacion) {
    combineLatest([
      this._empresa.datosGenerales(modificacion.empresaId),
      this._infoReporte.obtener(modificacion, 'DEPRECIACIÓN'),
    ])
      .pipe(
        tap(([empresa, infoReporte]) => {
          let reportePDF = {
            pageSize: 'letter',
            pageOrientation: 'portrait',
            info: metadataReporte(
              infoReporte,
              'DEPRECIACIÓN',
              this._sigesp.usuarioActivo
            ),
            footer: seccionPiePaginaReporte(infoReporte, 'DEPRECIACIÓN'),
            content: [
              seccionEncabezadoReporte(empresa, infoReporte, 'DEPRECIACIÓN'),
              seccionDatosGeneralesReporte(infoReporte, 'DEPRECIACIÓN'),
              seccionDetallesModificacionReporte(infoReporte),
            ],
            styles: this.estilosProceso,
          };
          pdfMake.createPdf(reportePDF).open();
        })
      )
      .subscribe();
  }

  abrirReportePDFDepreciacion(depreciacion: Depreciacion) {
    combineLatest([
      this._empresa.datosGenerales(depreciacion.empresaId),
      this._infoReporte.obtener(depreciacion, 'DEPRECIACIÓN'),
    ])
      .pipe(
        tap(([empresa, infoReporte]) => {
          let reportePDF = {
            pageSize: 'letter',
            pageOrientation: 'portrait',
            info: metadataReporte(
              infoReporte,
              'DEPRECIACIÓN',
              this._sigesp.usuarioActivo
            ),
            footer: seccionPiePaginaReporte(infoReporte, 'DEPRECIACIÓN'),
            content: [
              seccionEncabezadoReporte(empresa, infoReporte, 'DEPRECIACIÓN'),
              seccionDatosGeneralesReporte(infoReporte, 'DEPRECIACIÓN'),
              seccionDetalleDepreciacionReporte(infoReporte),
            ],
            styles: this.estilosProceso,
          };
          pdfMake.createPdf(reportePDF).open();
        })
      )
      .subscribe();
  }

  private generarPDF = (
    empresa: Empresa,
    proceso: any,
    tipoProceso: TipoProceso
  ) => ({
    pageSize: 'letter',
    pageOrientation: 'portrait',
    info: metadataReporte(proceso, tipoProceso, this._sigesp.usuarioActivo),
    footer: seccionPiePaginaReporte(proceso, tipoProceso),
    content: [
      seccionEncabezadoReporte(empresa, proceso, tipoProceso),
      seccionDatosGeneralesReporte(proceso, tipoProceso),
      seccionDetalleReporte(proceso),
    ],
    styles: this.estilosProceso,
  });

  private estilosProceso = {
    nombreEmpresa: {
      fontSize: 12,
      bold: true,
      alignment: 'center',
    },
    datosEmpresa: {
      fontSize: 6,
      alignment: 'center',
    },
    tituloReporte: {
      fontSize: 12,
      bold: true,
      alignment: 'right',
    },
    fechaReporte: {
      fontSize: 10,
      alignment: 'right',
    },
    seccionDatosGeneralesReporte: {
      fontSize: 8,
      margin: [0, 5, 0, 0],
    },
    tituloDatosGeneralesReporte: {
      fontSize: 8,
      bold: true,
      margin: [0, 5, 0, 0],
    },
    detalleReporte: {
      fontSize: 8,
      bold: true,
    },
    tituloDetalleReporte: {
      fontSize: 10,
      bold: true,
      decoration: 'underline',
      alignment: 'center',
      margin: [0, 10, 0, 0],
    },
    rayaFirmas: {
      alignment: 'center',
      margin: [5, 0, 5, 0],
    },
    tituloFirmas: {
      fontSize: 5,
      alignment: 'center',
      bold: true,
    },
    textoFirmas: {
      margin: [5, 0, 5, 0],
      fontSize: 7,
      alignment: 'center',
    },
  };
}
