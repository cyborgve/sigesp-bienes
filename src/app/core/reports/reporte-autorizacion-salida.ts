import { Empresa } from '@core/models/otros-modulos/empresa';
import { TipoProceso } from '@core/types/tipo-proceso';
import { seccionEncabezadoReporte } from './secciones/seccion-encabezado-reporte';
import { estilosProcesoReporte } from './auxiliares/estilos-proceso-reporte';
import { seccionActivosReporte } from './secciones/seccion-activos-reporte';
import { campoTextoConTituloReporte } from './auxiliares/campo-texto-titulo-reporte';
import { seccionPiePaginaReporte } from './secciones/seccion-pie-pagina-reporte';

// Definimos el tipo de proceso, que en este caso es 'ACTA DE PRÉSTAMO'
const tipoProceso: TipoProceso = 'AUTORIZACIÓN DE SALIDA';

// Función que genera la sección de "Datos Generales" en el informe
const datosGenerales = (proceso: any) => [
  campoTextoConTituloReporte(
    'Unidad Administrativa:',
    proceso.unidadAdministrativa
  ),
  {
    columns: [
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Empresa autorizada:',
            proceso.empresaAutorizada
          ),
        ],
      },
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Persona autorizada:',
            proceso.personaAutorizada
          ),
        ],
      },
    ],
  },
  campoTextoConTituloReporte('Explicación:', proceso.explicacion),
  campoTextoConTituloReporte('Observaciones:', proceso.observaciones),
];

// Función principal que genera el informe del "Acta de Préstamo"
export const reporteAutorizacionSalida = (
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
      creator: 'Sigesp ERP - Bienes',
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
