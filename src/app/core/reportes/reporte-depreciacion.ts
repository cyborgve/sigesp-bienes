import { Empresa } from '@core/models/otros-modulos/empresa';
import { TipoProceso } from '@core/types/tipo-proceso';
import { seccionEncabezadoReporte } from './secciones/seccion-encabezado-reporte';
import { estilosProcesoReporte } from './auxiliares/estilos-proceso-reporte';
import { campoTextoConTituloReporte } from './auxiliares/campo-texto-titulo-reporte';
import { seccionPiePaginaReporte } from './secciones/seccion-pie-pagina-reporte';
import { seccionActivosReporte } from './secciones/seccion-activos-reporte';
import { seccionDetalleDepreciacionReporte } from './secciones/seccion-detalle-depreciacion-reporte';

// Definimos el tipo de proceso, que en este caso es 'ACTA DE PRÉSTAMO'
const tipoProceso: TipoProceso = 'DEPRECIACIÓN';

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
        width: '25%',
        stack: [
          campoTextoConTituloReporte('Fecha de compra:', proceso.fechaCompra),
        ],
      },
      {
        width: '25%',
        stack: [
          campoTextoConTituloReporte(
            'Fecha de incorporación:',
            proceso.fechaIncorporacion
          ),
        ],
      },
    ],
  },
  {
    columns: [
      {
        width: '25%',
        stack: [campoTextoConTituloReporte('Costo:', proceso.costo)],
      },
      {
        width: '25%',
        stack: [
          campoTextoConTituloReporte('Vida útil:', proceso.vidaUtil + ' Meses'),
        ],
      },
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte('Método de Deoreciación:', proceso.metodo),
        ],
      },
    ],
  },
  {
    columns: [
      {
        width: '25%',
        stack: [
          campoTextoConTituloReporte('Valor de rescate:', proceso.valorRescate),
        ],
      },
      {
        width: '25%',
        stack: [
          campoTextoConTituloReporte(
            'Monto a depreciar:',
            Number(proceso.montoDepreciar).toFixed(2)
          ),
        ],
      },
      {
        width: '25%',
        stack: [
          campoTextoConTituloReporte(
            'Depreciación mensual:',
            Number(proceso.depreciacionMensual).toFixed(2)
          ),
        ],
      },
      {
        width: '25%',
        stack: [
          campoTextoConTituloReporte(
            'Depreciación anual:',
            Number(proceso.depreciacionAnual).toFixed(2)
          ),
        ],
      },
    ],
  },
  campoTextoConTituloReporte('Observaciones:', proceso.observaciones),
];

// Función principal que genera el informe del "Acta de Préstamo"
export const reporteDepreciacion = (
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
      creator: 'Sigesp ERP - Bienes',
    },
    content: [
      // Secciones del informe
      seccionEncabezadoReporte(empresa, proceso, tipoProceso),
      datosGenerales(proceso),
      seccionDetalleDepreciacionReporte(proceso),
    ],
    footer: seccionPiePaginaReporte(proceso, tipoProceso),
    styles: estilosProcesoReporte(),
  };
};
