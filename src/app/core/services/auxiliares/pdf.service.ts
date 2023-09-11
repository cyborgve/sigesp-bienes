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

  private generarPDF = (
    empresa: Empresa,
    proceso: any,
    tipoProceso: TipoProceso
  ) => ({
    pageSize: 'letter',
    pageOrientation: 'portrait',
    info: this.metadataReporte(proceso, tipoProceso),
    footer: this.piePaginaReporte('Generado por Sigesp - Bienes Nacionales'),
    content: [
      this.encabezadoReporte(empresa, proceso, tipoProceso),
      this.datosGeneralesReporte(proceso, tipoProceso),
      this.detalleReporte(proceso),
      //this.firmasReporte(),
    ],
    styles: this.estilosProceso,
  });

  private metadataReporte = (proceso: any, tipoProceso: TipoProceso) => ({
    title: `${tipoProceso}-${proceso.comprobante}`,
    subject: 'Comprobante de ejecucion de proceso',
    author: `${this._sigesp.usuarioActivo.nombre} ${this._sigesp.usuarioActivo.apellido}`,
    creator: 'Sigesp ERP - Bienes Nacionales',
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
    datosGeneralesReporte: {
      fontSize: 8,
      margin: [0, 0, 0, 3],
    },
    tituloDatosGeneralesReporte: {
      fontSize: 8,
      bold: true,
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
    footer: {
      fontSize: 8,
      bold: true,
      margin: [50, 0, 50, 50],
    },
    firmasReporte: {
      fontSize: 7,
      bold: true,
      margin: [0, 100, 0, 0],
    },
    firmante: {
      margin: [0, 0, 0, 30],
    },
  };

  private encabezadoReporte = (
    empresa: Empresa,
    proceso: any,
    tipoProceso: TipoProceso
  ) => ({
    columns: [
      {
        width: '50%',
        stack: this.seccionEmpresaReporte(empresa),
      },
      {
        width: '50%',
        stack: this.seccionTituloReporte(proceso, tipoProceso),
      },
    ],
  });

  private piePaginaReporte = (text: string) => [
    this.firmasReporte(),
    // {
    //   height: 200,
    //   text: text,
    //   style: 'footer',
    // },
  ];

  private seccionEmpresaReporte = (empresa: Empresa) => [
    {
      text: empresa.nombre + ' ' + empresa.rif,
      style: 'nombreEmpresa',
    },
    {
      text: empresa.direccion,
      style: 'datosEmpresa',
    },
    {
      text: `Teléfonos: ${empresa.telefono}  Fax: ${empresa.fax}`,
      style: 'datosEmpresa',
    },
    {
      text: `Correo electrónico: ${empresa.correoElectronico}`,
      style: 'datosEmpresa',
    },
  ];

  private seccionTituloReporte = (proceso: any, tipoProceso: TipoProceso) => [
    {
      text: `${tipoProceso} N° ${proceso.comprobante}`,
      style: 'tituloReporte',
    },
    {
      text: `Fecha de Emisión: ${new Date(proceso.creado).toLocaleDateString(
        undefined,
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      )}`,
      style: 'fechaReporte',
    },
    {
      text: `Hora de Emisión: ${new Date(proceso.creado).toLocaleTimeString(
        undefined,
        {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        }
      )}`,
      style: 'fechaReporte',
    },
  ];

  /**
   * DATOS PROCESO
   */
  private datosGeneralesReporte(proceso: any, tipoProceso: TipoProceso) {
    let resultado = {};
    switch (tipoProceso) {
      case 'ACTA DE PRESTAMO':
        resultado = this.seccionActaPrestamo(proceso);
        break;
      case 'AUTORIZACIÓN DE SALIDA':
        resultado = this.seccionAutorizacionSalida(proceso);
        break;
      case 'CAMBIO DE RESPONSABLE':
        resultado = this.seccionCambioResponsable(proceso);
        break;
      case 'DEPRECIACIÓN':
        resultado = this.seccionDepreciacion(proceso);
        break;
      case 'DESINCORPORACIÓN':
        resultado = this.seccionDesincorporacion(proceso);
        break;
      case 'ENTREGA DE UNIDAD':
        resultado = this.seccionEntregaUnidad(proceso);
        break;
      case 'INCORPORACIÓN':
        resultado = this.seccionIncorporacion(proceso);
        break;
      case 'MODIFICACIÓN':
        resultado = this.seccionModificacion(proceso);
        break;
      case 'REASIGNACIÓN':
        resultado = this.seccionReasignacion(proceso);
        break;
      case 'RETORNO':
        resultado = this.seccionRetorno(proceso);
        break;
    }
    return resultado;
  }

  /**
   * DATOS ACTA DE PRESTAMO
   */
  private seccionActaPrestamo = (proceso: any) => ({
    margin: [0, 10, 0, 0],
    columns: [
      {
        width: '50%',
        stack: [
          this.campoTextoConTitulo(
            'Unidad Administrativa Cedente:',
            proceso.unidadAdministrativaCedente
          ),
          this.campoTextoConTitulo(
            'Unidad Administrativa Receptora:',
            proceso.unidadAdministrativaReceptora
          ),
          this.campoTextoConTitulo('Testigo:', proceso.testigo),
        ],
      },
      {
        width: '50%',
        stack: [
          this.campoTextoConTitulo(
            'Responsable:',
            proceso.unidadCedenteResponsable
          ),
          this.campoTextoConTitulo(
            'Responsable:',
            proceso.unidadReceptoraRespnsable
          ),
        ],
      },
    ],
  });
  /**
   * DATOS AUTORIZACION DE SALIDA
   */
  private seccionAutorizacionSalida = (proceso: any) => <any>{};
  /**
   * DATOS CAMBIO RESPONSABLE
   */
  private seccionCambioResponsable = (proceso: any) => <any>{};
  /**
   * DATOS DEPRECIACION
   */
  private seccionDepreciacion = (proceso: any) => <any>{};
  /**
   * DATOS DESINCORPORACION
   */
  private seccionDesincorporacion = (proceso: any) => <any>{};
  /**
   * DATOS ENTREGA UNIDAD
   */
  private seccionEntregaUnidad = (proceso: any) => <any>{};
  /**
   * DATOS INCORPORACION
   */
  private seccionIncorporacion = (proceso: any) => ({
    margin: [0, 10, 0, 0],
    columns: [
      {
        width: '50%',
        margin: [0, 0, 5, 0],
        stack: [
          {
            columns: [
              {
                margin: [0, 0, 3, 0],
                width: 'auto',
                stack: [
                  {
                    text: 'Causa de Movimiento:',
                    style: 'tituloDatosGeneralesReporte',
                  },
                ],
              },
              {
                width: 'auto',
                stack: [
                  {
                    text: proceso.causaMovimiento,
                    style: 'datosGeneralesReporte',
                  },
                ],
              },
            ],
          },
          {
            columns: [
              {
                margin: [0, 0, 3, 0],
                width: 'auto',
                stack: [
                  { text: 'Sede:', style: 'tituloDatosGeneralesReporte' },
                ],
              },
              {
                width: 'auto',
                stack: [{ text: proceso.sede, style: 'datosGeneralesReporte' }],
              },
            ],
          },
          {
            columns: [
              {
                margin: [0, 0, 3, 0],
                width: 'auto',
                stack: [
                  {
                    text: 'Responsable Primario: ',
                    style: 'tituloDatosGeneralesReporte',
                  },
                ],
              },
              {
                width: 'auto',
                stack: [
                  {
                    text: proceso.responsablePrimario,
                    style: 'datosGeneralesReporte',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        width: '50%',
        margin: [5, 0, 0, 0],
        stack: [
          {
            columns: [
              {
                margin: [0, 0, 3, 0],
                width: 'auto',
                stack: [
                  {
                    text: 'Fecha de Entrega:',
                    style: 'tituloDatosGeneralesReporte',
                  },
                ],
              },
              {
                width: 'auto',
                stack: [
                  {
                    text: `${new Date(proceso.fechaEntrega).toLocaleDateString(
                      undefined,
                      {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      }
                    )}`,
                  },
                ],
                style: 'datosGeneralesReporte',
              },
            ],
          },
          {
            columns: [
              {
                width: 'auto',
                margin: [0, 0, 3, 0],
                stack: [
                  {
                    text: 'Unidad Administrativa:',
                    style: 'tituloDatosGeneralesReporte',
                  },
                ],
              },
              {
                width: 'auto',
                stack: [
                  {
                    text: proceso.unidadAdministrativa,
                    style: 'datosGeneralesReporte',
                  },
                ],
              },
            ],
          },
          {
            columns: [
              {
                width: 'auto',
                stack: [
                  {
                    text: 'Responsable de Uso: ',
                    style: 'tituloDatosGeneralesReporte',
                  },
                ],
              },
              {
                width: 'auto',
                stack: [
                  {
                    text: proceso.responsableUso,
                    style: 'datosGeneralesReporte',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  /**
   * DATOS MODIFICACION
   */
  private seccionModificacion = (proceso: any) => <any>{};
  /**
   * DATOS REASIGNACION
   */
  private seccionReasignacion = (proceso: any) => <any>{};
  /**
   * DATOS RETORNO
   */
  private seccionRetorno = (proceso: any) => <any>{};

  private detalleReporte = (proceso: any) => {
    let datos = [
      [
        'Código',
        'Tipo',
        'Denominación',
        'Identificador',
        { text: 'Valor', alignment: 'right' },
      ],
    ];
    proceso.activos.forEach((activo: any) => {
      datos.push([
        activo.codigo,
        activo.tipoActivo,
        activo.denominacion,
        activo.identificador,
        { text: activo.valor, alignment: 'right' },
      ]);
    });
    return [
      {
        text: 'B I E N E S',
        style: 'tituloDetalleReporte',
      },
      {
        table: {
          headerRows: 1,
          widths: ['8%', '12%', '50%', '15%', '15%'],
          body: datos,
        },
        style: 'detalleReporte',
        layout: 'lightHorizontalLines',
      },
    ];
  };

  private firmasReporte = () => ({
    height: 600,
    table: {
      headerRows: 1,
      widths: ['50%', '50%'],
      body: [
        [
          { text: 'Elaborado por', style: 'firmante' },
          { text: 'Aprobado por', style: 'firmante' },
        ],
        [
          { text: 'Verificado por', style: 'firmante' },
          { text: 'Autorizado por', style: 'firmante' },
        ],
      ],
    },
    style: 'footer',
  });

  private campoTextoConTitulo = (titulo: string, texto: string) => ({
    columns: [
      {
        width: 'auto',
        margin: [0, 0, 3, 0],
        stack: [
          {
            text: titulo,
            style: 'tituloDatosGeneralesReporte',
          },
        ],
      },
      {
        width: 'auto',
        stack: [
          {
            text: texto,
            style: 'datosGeneralesReporte',
          },
        ],
      },
    ],
  });
}
