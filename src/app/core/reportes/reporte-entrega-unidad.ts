import { Empresa } from '@core/models/otros-modulos/empresa';
import { seccionEncabezadoReporte } from './secciones/seccion-encabezado-reporte';
import { TipoProceso } from '@core/types/tipo-proceso';
import { estilosProcesoReporte } from './auxiliares/estilos-proceso-reporte';
import { campoTextoConTituloReporte } from './auxiliares/campo-texto-titulo-reporte';
import { seccionPiePaginaReporte } from './secciones/seccion-pie-pagina-reporte';

const tipoProceso: TipoProceso = 'ENTREGA DE UNIDAD';

export const reporteEntregaUnidad = (
  empresa: Empresa,
  proceso: any,
  usuarioActivo: any
) => {
  const activos = [
    [
      'Código',
      'Tipo',
      'Denominación',
      'Identificador',
      { text: 'Valor', alignment: 'right' },
    ],
  ];
  proceso.activos.forEach((activo: any) =>
    activos.push([
      activo.codigo,
      activo.tipoActivo,
      activo.denominacion,
      activo.identificador,
      { text: activo.valor, alignment: 'right' },
    ])
  );
  return {
    pageSize: 'letter',
    pageOrientation: 'portrait',
    info: {
      title: `${tipoProceso}-${proceso.comprobante}`,
      subject: 'Comprobante de ejecucion de proceso',
      author: `${usuarioActivo.nombre} ${usuarioActivo.apellido}`,
      creator: 'Sigesp ERP - Bienes Nacionales',
    },
    content: [
      seccionEncabezadoReporte(empresa, proceso, tipoProceso),
      datosGenerales(proceso),
      bienesAfectados(activos),
    ],
    footer: seccionPiePaginaReporte(proceso, tipoProceso),
    styles: estilosProcesoReporte(),
  };
};

const datosGenerales = (proceso: any) => [
  campoTextoConTituloReporte(
    'Unidad Administrativa:',
    proceso.unidadAdministrativa
  ),
  campoTextoConTituloReporte('Sede:', proceso.sede),
  {
    columns: [
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Responsable anterior:',
            proceso.responsableAnterior
          ),
        ],
      },
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Nuevo responsable:',
            proceso.nuevoResponsable
          ),
        ],
      },
    ],
  },
  campoTextoConTituloReporte('Observaciones:', proceso.observaciones),
];

const bienesAfectados = (activos: any[]) => [
  {
    text: 'B I E N E S  A S O C I A D O S',
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
