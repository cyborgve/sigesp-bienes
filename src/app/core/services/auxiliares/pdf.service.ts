import { tap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmpresaService } from '../otros-modulos/empresa.service';
import { Empresa } from '@core/models/otros-modulos/empresa';
import { SigespService } from 'sigesp';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { TIPOS_ACTIVO } from '@core/constants/tipos_activo';

@Injectable({
  providedIn: 'root',
})
export class PDFService {
  constructor(
    private _empresa: EmpresaService,
    private _sigesp: SigespService
  ) {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }

  abrirDocumento(documento: any, tipoDocumento: string) {
    this._empresa
      .datosGenerales(documento.empresaId)
      .pipe(
        tap(empresa => {
          let titulo = this.documentoPDF(empresa, documento, tipoDocumento);
          pdfMake.createPdf(titulo).open();
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
          pdfMake.createPdf(titulo).save();
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
    content: [
      this.encabezado(empresa, documento, tipoDocumento),
      this.detalleDocumento(documento),
    ],
    styles: this.estilosDocumento,
  });

  private infoDocumento = (documento: any, tipoDocumento: string) => ({
    title: `${tipoDocumento}-${String(documento.comprobante).substring(5)}`,
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
    fechaDocumento: {
      fontSize: 10,
      alignment: 'right',
    },
    estilosTabla: {
      fontSize: 8,
      bold: true,
      margin: [0, 10, 0, 0],
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
      text: `${tipoDocumento} N° ${String(documento.comprobante).substring(5)}`,
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

  private datosDocumento = (documento: any) => {};

  private detalleDocumento = (documento: any) => {
    let datos = [['Código', 'Tipo', 'Denominación']];
    documento.activos.forEach((activo: ActivoProceso) => {
      datos.push([
        String(activo.codigo).substring(5),
        TIPOS_ACTIVO.find(
          ta => ta.substring(0, 3).toUpperCase() === activo.tipoActivo
        ),
        activo.denominacion,
      ]);
    });
    return {
      table: {
        widths: ['10%', '20%', '70%'],
        body: datos,
      },
      style: 'estilosTabla',
      layout: 'lightHorizontalLines',
    };
  };
}
