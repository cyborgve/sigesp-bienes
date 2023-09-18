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
            info: this.metadataReporte(infoReporte, 'ENTREGA DE UNIDAD'),
            footer: this.piePagina(),
            content: [
              this.encabezadoReporte(empresa, infoReporte, 'ENTREGA DE UNIDAD'),
              this.datosGeneralesReporte(infoReporte, 'ENTREGA DE UNIDAD'),
            ],
            styles: this.estilosProceso,
          };
          pdfMake.createPdf(reportePDF).open();
        }),
        take(1)
      )
      .subscribe();
  }

  abrirReportePDFModificacion(modificacion: Modificacion) {
    combineLatest([
      this._empresa.datosGenerales(modificacion.empresaId),
      this._infoReporte.obtener(modificacion, 'MODIFICACIÓN'),
    ])
      .pipe(
        tap(([empresa, infoReporte]) => {
          let reportePDF = {
            pageSize: 'letter',
            pageOrientation: 'portrait',
            info: this.metadataReporte(infoReporte, 'MODIFICACIÓN'),
            footer: this.piePagina(),
            content: [
              this.encabezadoReporte(empresa, infoReporte, 'MODIFICACIÓN'),
              this.datosGeneralesReporte(infoReporte, 'MODIFICACIÓN'),
              this.detallesModificacionReporte(infoReporte),
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
    info: this.metadataReporte(proceso, tipoProceso),
    footer: this.piePagina(),
    content: [
      this.encabezadoReporte(empresa, proceso, tipoProceso),
      this.datosGeneralesReporte(proceso, tipoProceso),
      this.detalleReporte(proceso),
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
    footer: {
      fontSize: 8,
      bold: true,
      margin: [50, 0, 50, 50],
    },
    piePagina: {
      fontSize: 7,
      bold: true,
    },
    firmante: {
      fontSize: 8,
      alignment: 'center',
      bold: true,
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
      case 'ACTA DE PRÉSTAMO':
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
  private seccionActaPrestamo = (proceso: any) => [
    {
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
              'Responsable cedente:',
              proceso.unidadCedenteResponsable
            ),
            this.campoTextoConTitulo(
              'Responsable receptor:',
              proceso.unidadReceptoraResponsable
            ),
          ],
        },
      ],
    },
    this.campoTextoConTitulo('Notas:', proceso.notas),
  ];
  /**
   * DATOS AUTORIZACION DE SALIDA
   */
  private seccionAutorizacionSalida = (proceso: any) => [
    {
      margin: [0, 10, 0, 0],
      columns: [
        {
          width: '50%',
          stack: [
            this.campoTextoConTitulo(
              'Unidad Administrativa:',
              proceso.unidadAdministrativa
            ),
            this.campoTextoConTitulo(
              'Persona Autorizada:',
              proceso.personaAutorizada
            ),
          ],
        },
        {
          width: '50%',
          stack: [
            this.campoTextoConTitulo(
              'Empresa Autorizada:',
              proceso.empresaAutorizada
            ),
            this.campoTextoConTitulo('', ''),
          ],
        },
      ],
    },
    this.campoTextoConTitulo('Explicación:', proceso.explicacion),
    this.campoTextoConTitulo('Notas:', proceso.notas),
  ];
  /**
   * DATOS CAMBIO RESPONSABLE
   */
  private seccionCambioResponsable = (proceso: any) => [
    {
      margin: [0, 10, 0, 0],
      columns: [
        {
          width: '50%',
          stack: [
            this.campoTextoConTitulo(
              proceso.tipoResponsable + ' Actual:',
              proceso.responsableActual
            ),
          ],
        },
        {
          width: '50%',
          stack: [
            this.campoTextoConTitulo(
              'Nuevo ' + proceso.tipoResponsable + ':',
              proceso.nuevoResponsable
            ),
          ],
        },
      ],
    },
    this.campoTextoConTitulo('Observaciones:', proceso.observaciones),
  ];
  /**
   * DATOS DEPRECIACION
   */
  private seccionDepreciacion = (proceso: any) => <any>{};
  /**
   * DATOS DESINCORPORACION
   */
  private seccionDesincorporacion = (proceso: any) => [
    {
      margin: [0, 10, 0, 0],
      columns: [
        {
          width: '50%',
          stack: [
            this.campoTextoConTitulo(
              'Causa de movimiento:',
              proceso.causaMovimiento
            ),
          ],
        },
        {
          width: '50%',
          stack: [
            this.campoTextoConTitulo(
              'Unidad Administrativa:',
              proceso.unidadAdministrativa
            ),
          ],
        },
      ],
    },
    this.campoTextoConTitulo('Observaciones:', proceso.observaciones),
  ];
  /**
   * DATOS ENTREGA UNIDAD
   */
  private seccionEntregaUnidad = (proceso: any) => [
    this.campoTextoConTitulo(
      'Unidad Administrativa:',
      proceso.unidadAdministrativa
    ),
    this.campoTextoConTitulo('Sede:', proceso.sede),
    {
      columns: [
        {
          width: '50%',
          stack: [
            this.campoTextoConTitulo(
              'Responsable anterior:',
              proceso.responsableAnterior
            ),
          ],
        },
        {
          width: '50%',
          stack: [
            this.campoTextoConTitulo(
              'Nuevo responsable:',
              proceso.nuevoResponsable
            ),
          ],
        },
      ],
    },
    this.campoTextoConTitulo('Observaciones:', proceso.observaciones),
  ];
  /**
   * DATOS INCORPORACION
   */
  private seccionIncorporacion = (proceso: any) => [
    {
      columns: [
        {
          width: '50%',
          stack: [
            this.campoTextoConTitulo(
              'Causa de Movimiento:',
              proceso.causaMovimiento
            ),
            this.campoTextoConTitulo('Sede:', proceso.sede),
            this.campoTextoConTitulo(
              'Responsable Primario:',
              proceso.responsablePrimario
            ),
          ],
        },
        {
          width: '50%',
          stack: [
            this.campoTextoConTitulo('Fecha de entrega:', proceso.fechaEntrega),
            this.campoTextoConTitulo(
              'Unidad Administrativa',
              proceso.unidadAdministrativa
            ),
            this.campoTextoConTitulo(
              'Responsable de Uso:',
              proceso.responsableUso
            ),
          ],
        },
      ],
    },
    this.campoTextoConTitulo('Observaciones:', proceso.observaciones),
  ];
  /**
   * DATOS MODIFICACION
   */
  private seccionModificacion = (proceso: any) => [
    this.campoTextoConTitulo('Bien:', proceso.activo),
    {
      columns: [
        {
          width: '25%',
          stack: [
            this.campoTextoConTitulo('Identificador:', proceso.identificador),
          ],
        },
        {
          width: '25%',
          stack: [this.campoTextoConTitulo('Serial:', proceso.serial)],
        },
        {
          width: '60%',
          stack: [
            this.campoTextoConTitulo(
              'Causa de Movimiento:',
              proceso.causaMovimiento
            ),
          ],
        },
      ],
    },
    this.campoTextoConTitulo('Observaciones:', proceso.observaciones),
  ];
  /**
   * DATOS REASIGNACION
   */
  private seccionReasignacion = (proceso: any) => <any>{};
  /**
   * DATOS RETORNO
   */
  private seccionRetorno = (proceso: any) => <any>{};

  private detalleReporte = (proceso: any) => {
    let activos = [
      [
        'Código',
        'Tipo',
        'Denominación',
        'Identificador',
        { text: 'Valor', alignment: 'right' },
      ],
    ];
    proceso.activos.forEach((activo: any) => {
      activos.push([
        activo.codigo,
        activo.tipoActivo,
        activo.denominacion,
        activo.identificador,
        { text: activo.valor, alignment: 'right' },
      ]);
    });

    let cuentasContables = [['Cuenta Contable', 'Denominación']];
    if (proceso.cuentasContables)
      proceso.cuentasContables.forEach(cuentaProceso =>
        cuentasContables.push([
          cuentaProceso.cuentaContable,
          cuentaProceso.denominacion,
        ])
      );

    return proceso.cuentasContables
      ? [
          {
            text: 'B I E N E S',
            style: 'tituloDetalleReporte',
          },
          {
            table: {
              headerRows: 1,
              widths: ['8%', '12%', '50%', '15%', '15%'],
              body: activos,
            },
            style: 'detalleReporte',
            layout: 'lightHorizontalLines',
          },
          {
            text: 'C U E N T A S   C O N T A B L E S',
            style: 'tituloDetalleReporte',
          },
          {
            table: {
              headerRows: 1,
              widths: ['20%', '80%'],
              body: cuentasContables,
            },
            style: 'detalleReporte',
            layout: 'lightHorizontalLines',
          },
        ]
      : [
          {
            text: 'B I E N E S',
            style: 'tituloDetalleReporte',
          },
          {
            table: {
              headerRows: 1,
              widths: ['8%', '12%', '50%', '15%', '15%'],
              body: activos,
            },
            style: 'detalleReporte',
            layout: 'lightHorizontalLines',
          },
        ];
  };

  private detallesModificacionReporte(proceso: any) {
    let componentes = [['Código', 'Tipo', 'Denominación']];
    proceso.modificaciones.forEach(componente =>
      componentes.push([
        String(componente.codigo).substring(5),
        componente.tipoComponente,
        componente.denominacion,
      ])
    );
    let cuentasContables = [['Cuenta Contable', 'Denominación']];
    proceso.cuentasContables.forEach(cuentaProceso =>
      cuentasContables.push([
        cuentaProceso.cuentaContable,
        cuentaProceso.denominacion,
      ])
    );
    return [
      {
        text: 'M O D I F I C A C I O N E S',
        style: 'tituloDetalleReporte',
      },
      {
        table: {
          headerRows: 1,
          widths: ['15%', '25%', '60%'],
          body: componentes,
        },
        style: 'detalleReporte',
        layout: 'lightHorizontalLines',
      },
      {
        text: 'C U E N T A S   C O N T A B L E S',
        style: 'tituloDetalleReporte',
      },
      {
        table: {
          headerRows: 1,
          widths: ['20%', '80%'],
          body: cuentasContables,
        },
        style: 'detalleReporte',
        layout: 'lightHorizontalLines',
      },
    ];
  }

  private piePagina = () => ({
    columns: [
      {
        width: '25%',
        stack: [
          { text: '___________________________________', style: 'firmante' },
          { text: 'Elaborado por', style: 'firmante' },
        ],
      },
      {
        width: '25%',
        stack: [
          { text: '___________________________________', style: 'firmante' },
          { text: 'Verificado por', style: 'firmante' },
        ],
      },
      {
        width: '25%',
        stack: [
          { text: '___________________________________', style: 'firmante' },
          { text: 'Autorizado por', style: 'firmante' },
        ],
      },
      {
        width: '25%',
        stack: [
          { text: '___________________________________', style: 'firmante' },
          { text: 'Aprobado por', style: 'firmante' },
        ],
      },
    ],
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
