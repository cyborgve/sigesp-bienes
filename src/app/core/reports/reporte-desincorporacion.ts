import { Empresa } from '@core/models/otros-modulos/empresa';
import { TipoProceso } from '@core/types/tipo-proceso';
import { seccionEncabezadoReporte } from './secciones/seccion-encabezado-reporte';
import { estilosProcesoReporte } from './auxiliares/estilos-proceso-reporte';
import { seccionActivosReporte } from './secciones/seccion-activos-reporte';
import { campoTextoConTituloReporte } from './auxiliares/campo-texto-titulo-reporte';
import { seccionPiePaginaReporte } from './secciones/seccion-pie-pagina-reporte';
import { seccionCuentasContablesReporte } from './secciones/seccion-cuentas-contable-reporte';

// Definimos el tipo de proceso, que en este caso es 'ACTA DE PRÉSTAMO'
const tipoProceso: TipoProceso = 'DESINCORPORACIÓN';

// Función que genera la sección de "Datos Generales" en el informe
const datosGenerales = (proceso: any) => [
  {
    margin: [0, 10, 0, 0],
    columns: [
      {
        width: '30%',
        stack: [
          campoTextoConTituloReporte(
            'Causa de movimiento:',
            proceso.causaMovimiento
          ),
        ],
      },
      {
        width: '70%',
        stack: [
          campoTextoConTituloReporte(
            'Unidad Administrativa:',
            proceso.unidadAdministrativa
          ),
        ],
      },
    ],
  },
  campoTextoConTituloReporte('Notas:', proceso.notas),
];

// Función principal que genera el informe del "Acta de Préstamo"
export const reporteDesincorporacion = (
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

  // Crear una matriz de cuentas contable para el informe
  let cuentasContables = [['Código', 'Denominación']];

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

  // Iterar sobre las cuentas contables del proceso y agregarlos a la matriz
  proceso.cuentasContables.forEach(cuentaProceso =>
    cuentasContables.push([
      cuentaProceso.cuentaContable,
      cuentaProceso.denominacion,
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
      seccionCuentasContablesReporte(cuentasContables),
    ],
    footer: seccionPiePaginaReporte(proceso, tipoProceso),
    styles: estilosProcesoReporte(),
  };
};
