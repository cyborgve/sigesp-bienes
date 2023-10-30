import { Empresa } from '@core/models/otros-modulos/empresa';
import { seccionEncabezadoReporte } from './secciones/seccion-encabezado-reporte';
import { TipoProceso } from '@core/types/tipo-proceso';
import { seccionDatosGeneralesReporte } from './secciones/seccion-datos-generales-reporte';
import { estilosProcesoReporte } from './auxiliares/estilos-proceso-reporte';
import { campoFirmaReporte } from './auxiliares/campo-firma-reporte';

const tipoProceso: TipoProceso = 'ENTREGA DE UNIDAD';
const activos = [
  [
    'Código',
    'Tipo',
    'Denominación',
    'Identificador',
    { text: 'Valor', alignment: 'right' },
  ],
];

export const reporteEntregaUnidad = (
  empresa: Empresa,
  proceso: any,
  usuarioActivo: any
) => ({
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
    seccionDatosGeneralesReporte(proceso, tipoProceso),
    bienesAfectados(activos),
  ],
  footer: piePagina(proceso),
  styles: estilosProcesoReporte(),
});

const piePagina = (proceso: any) => ({
  columns: [
    {
      width: '50%',
      stack: campoFirmaReporte(
        'Responsable Anterior',
        proceso.responsableAnterior
      ),
    },
    {
      width: '50%',
      stack: campoFirmaReporte('Nuevo Responsable', proceso.nuevoResponsable),
    },
  ],
});

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
