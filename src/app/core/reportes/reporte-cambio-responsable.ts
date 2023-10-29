import { Empresa } from '@core/models/otros-modulos/empresa';
import { TipoProceso } from '@core/types/tipo-proceso';
import { seccionEncabezadoReporte } from './secciones/seccion-encabezado-reporte';
import { estilosProcesoReporte } from './auxiliares/estilos-proceso-reporte';
import { campoTextoConTituloReporte } from './auxiliares/campo-texto-titulo-reporte';
import { seccionPiePaginaReporte } from './secciones/seccion-pie-pagina-reporte';
import { seccionActivosReporte } from './secciones/seccion-activos-reporte';

// Definimos el tipo de proceso, que en este caso es 'ACTA DE PRÉSTAMO'
const tipoProceso: TipoProceso = 'CAMBIO DE RESPONSABLE';

// Función que genera la sección de "Datos Generales" en el informe
const datosGenerales = (proceso: any) => [
  campoTextoConTituloReporte('Tipo de Responsable:', proceso.tipoResponsable),
  {
    columns: [
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Responsable actual:',
            proceso.responsableActual
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

// Función principal que genera el informe del "Acta de Préstamo"
export const reporteCambioResponsable = (
  empresa: Empresa,
  proceso: any,
  usuarioActivo: any
) => {
  // Crear una matriz de activos para el informe
  let activos = [
    [
      'Código',
      'Tipo',
      'Denominación',
      'Identificador',
      { text: 'Valor', alignment: 'right' },
    ],
  ];

  // Iterar sobre los activos del proceso y agregarlos a la matriz
  proceso.activos.forEach((activo: any) =>
    activos.push([
      activo.codigo,
      activo.tipoActivo,
      activo.denominacion,
      activo.identificador,
      { text: activo.valor, alignment: 'right' },
    ])
  );

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
      seccionActivosReporte(activos),
    ],
    footer: seccionPiePaginaReporte(proceso, tipoProceso),
    styles: estilosProcesoReporte(),
  };
};
