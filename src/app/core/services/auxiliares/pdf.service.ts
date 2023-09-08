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
import { Proceso } from '@core/types/proceso';

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

  abrirProceso(proceso: Proceso, tipoProceso: TipoProceso) {
    combineLatest([
      this._empresa.datosGenerales(proceso.empresaId),
      this._infoReporte.obtener(proceso, tipoProceso),
    ])
      .pipe(
        tap(([empresa, infoReporte]) => {
          let reportePDF = this.reportePDF(empresa, infoReporte, tipoProceso);
          pdfMake.createPdf(reportePDF).open();
        }),
        take(1)
      )
      .subscribe();
  }

  private reportePDF = (
    empresa: Empresa,
    proceso: Proceso,
    tipoProceso: TipoProceso
  ) => ({
    pageSize: 'letter',
    pageOrientation: 'portrait',
    info: this.infoReporte(proceso, tipoProceso),
    footer: this.piePagina(),
    content: [
      this.encabezado(empresa, proceso, tipoProceso),
      this.datosProceso(proceso),
      this.detalleProceso(proceso),
      this.firmasProceso(),
    ],
    styles: this.estilosProceso,
  });

  private infoReporte = (proceso: any, tipoProceso: TipoProceso) => ({
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
    tituloProceso: {
      fontSize: 12,
      bold: true,
      alignment: 'right',
    },
    datosProcesoFecha: {
      fontSize: 10,
      alignment: 'right',
    },
    datosProceso: {
      fontSize: 8,
      margin: [0, 0, 0, 3],
    },
    datosProcesoTitulo: {
      fontSize: 8,
      bold: true,
    },
    estilosTabla: {
      fontSize: 8,
      bold: true,
    },
    tituloTabla: {
      fontSize: 10,
      bold: true,
      decoration: 'underline',
      alignment: 'center',
      margin: [0, 10, 0, 0],
    },
    footer: {
      fontSize: 8,
      bold: true,
      alignment: 'right',
      margin: [0, 0, 40, 0],
    },
    firmasProceso: {
      fontSize: 7,
      bold: true,
      margin: [0, 100, 0, 0],
    },
    firmante: {
      margin: [0, 0, 0, 30],
    },
  };

  private encabezado = (
    empresa: Empresa,
    proceso: any,
    tipoProceso: TipoProceso
  ) => ({
    columns: [
      {
        width: '50%',
        stack: this.datosEmpresa(empresa),
      },
      {
        width: '50%',
        stack: this.tituloProceso(proceso, tipoProceso),
      },
    ],
  });

  private piePagina = () => [
    {
      text: 'Generado por Sigesp - Bienes Nacionales',
      style: 'footer',
    },
  ];

  private datosEmpresa = (empresa: Empresa) => [
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

  private tituloProceso = (proceso: any, tipoProceso: TipoProceso) => [
    {
      text: `${tipoProceso} N° ${proceso.comprobante}`,
      style: 'tituloProceso',
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
      style: 'datosProcesoFecha',
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
      style: 'datosProcesoFecha',
    },
  ];

  private datosProceso = (proceso: any) => ({
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
                    style: 'datosProcesoTitulo',
                  },
                ],
              },
              {
                width: 'auto',
                stack: [
                  { text: proceso.causaMovimiento, style: 'datosProceso' },
                ],
              },
            ],
          },
          {
            columns: [
              {
                margin: [0, 0, 3, 0],
                width: 'auto',
                stack: [{ text: 'Sede:', style: 'datosProcesoTitulo' }],
              },
              {
                width: 'auto',
                stack: [{ text: proceso.sede, style: 'datosProceso' }],
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
                    style: 'datosProcesoTitulo',
                  },
                ],
              },
              {
                width: 'auto',
                stack: [
                  {
                    text: proceso.responsablePrimario,
                    style: 'datosProceso',
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
                    style: 'datosProcesoTitulo',
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
                style: 'datosProceso',
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
                    style: 'datosProcesoTitulo',
                  },
                ],
              },
              {
                width: 'auto',
                stack: [
                  {
                    text: proceso.unidadAdministrativa,
                    style: 'datosProceso',
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
                    style: 'datosProcesoTitulo',
                  },
                ],
              },
              {
                width: 'auto',
                stack: [
                  {
                    text: proceso.responsableUso,
                    style: 'datosProceso',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  private detalleProceso = (proceso: any) => {
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
        style: 'tituloTabla',
      },
      {
        table: {
          headerRows: 1,
          widths: ['8%', '12%', '50%', '15%', '15%'],
          body: datos,
        },
        style: 'estilosTabla',
        layout: 'lightHorizontalLines',
      },
    ];
  };

  private firmasProceso = () => ({
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
    style: 'firmasProceso',
  });
}
