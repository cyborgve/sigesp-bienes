import { Empresa } from '@core/models/otros-modulos/empresa';
import { TipoProceso } from '@core/types/tipo-proceso';
import { seccionEncabezadoReporte } from './secciones/seccion-encabezado-reporte';
import { estilosProcesoReporte } from './auxiliares/estilos-proceso-reporte';
import { campoTextoConTituloReporte } from './auxiliares/campo-texto-titulo-reporte';
import { seccionPiePaginaReporte } from './secciones/seccion-pie-pagina-reporte';
import { seccionDetallesModificacionReporte } from './secciones/seccion-detalles-modificacion-reporte';

// Definimos el tipo de proceso, que en este caso es 'MODIFICACIÓN'
const tipoProceso: TipoProceso = 'MODIFICACIÓN';

// Función que genera la sección de "Datos Generales" en el informe
const datosGenerales = (proceso: any) => [
  campoTextoConTituloReporte('Bien:', proceso.activo),
  {
    columns: [
      {
        width: '25%',
        stack: [
          campoTextoConTituloReporte('Identificador:', proceso.identificador),
        ],
      },
      {
        width: '25%',
        stack: [campoTextoConTituloReporte('Serial:', proceso.serial)],
      },
      {
        width: '60%',
        stack: [
          campoTextoConTituloReporte(
            'Causa de Movimiento:',
            proceso.causaMovimiento
          ),
        ],
      },
    ],
  },
  campoTextoConTituloReporte('Observaciones:', proceso.observaciones),
];

// Función principal que genera el informe del "Acta de Préstamo"
export const reporteModificacion = (
  empresa: Empresa,
  proceso: any,
  usuarioActivo: any
) => {
  // Configuración del informe
  return {
    pageSize: 'letter',
    pageOrientation: 'portrait',
    info: {
      title: `${tipoProceso}-${proceso.comprobante}`,
      subject: 'Comprobante de ejecucion de proceso',
      author: usuarioActivo,
      creator: 'Sigesp ERP - Bienes Nacionales',
    },
    content: [
      // Secciones del informe
      seccionEncabezadoReporte(empresa, proceso, tipoProceso),
      datosGenerales(proceso),
      seccionDetallesModificacionReporte(proceso),
    ],
    footer: seccionPiePaginaReporte(proceso, tipoProceso),
    styles: estilosProcesoReporte(),
  };
};
