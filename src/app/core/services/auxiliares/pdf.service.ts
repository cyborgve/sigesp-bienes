import { style } from '@angular/animations';
import { tap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmpresaService } from '../otros-modulos/empresa.service';
import { Empresa } from '@core/models/otros-modulos/empresa';
import { SigespService } from 'sigesp';
import { combineLatest } from 'rxjs';
import { InformacionProcesoService } from './informacion-proceso.service';

@Injectable({
  providedIn: 'root',
})
export class PDFService {
  constructor(
    private _empresa: EmpresaService,
    private _sigesp: SigespService,
    private _infoProceso: InformacionProcesoService
  ) {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }

  abrirDocumento(documento: any, tipoDocumento: string) {
    combineLatest([
      this._empresa.datosGenerales(documento.empresaId),
      this._infoProceso.obtener(documento, 'INCORPORACIÓN'),
    ])
      .pipe(
        tap(([empresa, infoDocumento]) => {
          console.log(infoDocumento);
          let documentoPDF = this.documentoPDF(
            empresa,
            infoDocumento,
            tipoDocumento
          );
          pdfMake.createPdf(documentoPDF).open();
        }),
        take(1)
      )
      .subscribe();
  }

  guardarDocumento(documento, tipoDocumento: string) {
    this._empresa
      .datosGenerales(documento.empresaId)
      .pipe(
        tap(empresa => {
          let titulo = this.documentoPDF(empresa, documento, tipoDocumento);
          pdfMake.createPdf(titulo).download('sbn_incorporacion.pdf');
        }),
        take(1)
      )
      .subscribe();
  }

  imprimirDocumento(documento, tipoDocumento: string) {
    this._empresa
      .datosGenerales(documento.empresaId)
      .pipe(
        tap(empresa => {
          let titulo = this.documentoPDF(empresa, documento, tipoDocumento);
          pdfMake.createPdf(titulo).print();
        }),
        take(1)
      )
      .subscribe();
  }

  private documentoPDF = (
    empresa: Empresa,
    documento: any,
    tipoDocumento: string
  ) => ({
    pageSize: 'letter',
    pageOrientation: 'portrait',
    info: this.infoDocumento(documento, tipoDocumento),
    footer: this.piePagina,
    content: [
      this.encabezado(empresa, documento, tipoDocumento),
      this.datosDocumento(documento),
      this.detalleDocumento(documento),
      this.firmasDocumento,
    ],
    styles: this.estilosDocumento,
  });

  private infoDocumento = (documento: any, tipoDocumento: string) => ({
    title: `${tipoDocumento}-${documento.comprobante}`,
    subject: 'Comprobante de ejecucion de proceso',
    author: `${this._sigesp.usuarioActivo.nombre} ${this._sigesp.usuarioActivo.apellido}`,
    creator: 'Sigesp ERP - Bienes Nacionales',
  });

  private estilosDocumento = {
    nombreEmpresa: {
      fontSize: 12,
      bold: true,
      alignment: 'center',
    },
    datosEmpresa: {
      fontSize: 6,
      alignment: 'center',
    },
    tipoDocumento: {
      fontSize: 12,
      bold: true,
      alignment: 'right',
    },
    datosDocumento: {
      fontSize: 8,
      margin: [0, 0, 0, 3],
    },
    fechaDocumento: {
      fontSize: 10,
      alignment: 'right',
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
    firmasDocumento: {
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
    documento: any,
    tipoDocumento: string
  ) => ({
    columns: [
      {
        width: '50%',
        stack: this.tituloDocumento(empresa),
      },
      {
        width: '50%',
        stack: this.tituloDatosDoccumento(documento, tipoDocumento),
      },
    ],
  });

  private piePagina = [
    {
      text: 'Generado por Sigesp - Bienes Nacionales',
      style: 'footer',
    },
  ];

  private tituloDocumento = (empresa: Empresa) => [
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

  private tituloDatosDoccumento = (documento: any, tipoDocumento: string) => [
    {
      text: `${tipoDocumento} N° ${documento.comprobante}`,
      style: 'tipoDocumento',
    },
    {
      text: `Fecha de Emisión: ${new Date(documento.creado).toLocaleDateString(
        undefined,
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      )}`,
      style: 'fechaDocumento',
    },
    {
      text: `Hora de Emisión: ${new Date(documento.creado).toLocaleTimeString(
        undefined,
        {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        }
      )}`,
      style: 'fechaDocumento',
    },
  ];

  private datosDocumento = (documento: any) => ({
    margin: [0, 10, 0, 0],
    columns: [
      {
        width: '50%',
        margin: [0, 0, 5, 0],
        stack: [
          {
            text: 'Causa de Movimiento: ' + documento.causaMovimiento,
            style: 'datosDocumento',
          },
          {
            text: 'Sede: ' + documento.sede,
            style: 'datosDocumento',
          },
          {
            text: 'Responsable Primario: ' + documento.responsablePrimario,
            style: 'datosDocumento',
          },
        ],
      },
      {
        width: '50%',
        margin: [5, 0, 0, 0],
        stack: [
          {
            text: `Fecha de Entrega: ${new Date(
              documento.fechaEntrega
            ).toLocaleDateString(undefined, {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}`,
            style: 'datosDocumento',
          },
          {
            text: 'Unidad Administrativa: ' + documento.unidadAdministrativa,
            style: 'datosDocumento',
          },
          {
            text: 'Responsable de Uso: ' + documento.responsableUso,
            style: 'datosDocumento',
          },
        ],
      },
    ],
  });

  private detalleDocumento = (documento: any) => {
    let datos = [
      [
        'Código',
        'Tipo',
        'Denominación',
        'Identificador',
        { text: 'Valor', alignment: 'right' },
      ],
    ];
    documento.activos.forEach((activo: any) => {
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

  private firmasDocumento = {
    table: {
      headerRows: 1,
      widths: ['50%', '50%'],
      body: [
        [
          { text: 'Elaborado por', style: 'firmante' },
          { text: 'Elaborado por', style: 'firmante' },
        ],
        [
          { text: 'Elaborado por', style: 'firmante' },
          { text: 'Elaborado por', style: 'firmante' },
        ],
      ],
    },
    style: 'firmasDocumento',
  };
}
