import { TipoProceso } from '@core/types/tipo-proceso';
import { campoTextoConTituloReporte } from '../auxiliares/campo-texto-titulo-reporte';

export const seccionDatosGeneralesReporte = (
  proceso: any,
  tipoProceso: TipoProceso
) => {
  let resultado = {};
  switch (tipoProceso) {
    case 'ACTA DE PRÉSTAMO':
      resultado = seccionActaPrestamo(proceso);
      break;
    case 'AUTORIZACIÓN DE SALIDA':
      resultado = seccionAutorizacionSalida(proceso);
      break;
    case 'CAMBIO DE RESPONSABLE':
      resultado = seccionCambioResponsable(proceso);
      break;
    case 'DEPRECIACIÓN':
      resultado = seccionDepreciacion(proceso);
      break;
    case 'DESINCORPORACIÓN':
      resultado = seccionDesincorporacion(proceso);
      break;
    case 'ENTREGA DE UNIDAD':
      resultado = seccionEntregaUnidad(proceso);
      break;
    case 'INCORPORACIÓN':
      resultado = seccionIncorporacion(proceso);
      break;
    case 'MODIFICACIÓN':
      resultado = seccionModificacion(proceso);
      break;
    case 'REASIGNACIÓN':
      resultado = seccionReasignacion(proceso);
      break;
    case 'RETORNO':
      resultado = seccionRetorno(proceso);
      break;
  }
  return resultado;
};

/**
 * DATOS ACTA DE PRESTAMO
 */
const seccionActaPrestamo = (proceso: any) => [
  {
    margin: [0, 10, 0, 0],
    columns: [
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Unidad Administrativa Cedente:',
            proceso.unidadAdministrativaCedente
          ),
          campoTextoConTituloReporte(
            'Unidad Administrativa Receptora:',
            proceso.unidadAdministrativaReceptora
          ),
          campoTextoConTituloReporte('Testigo:', proceso.testigo),
        ],
      },
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Responsable cedente:',
            proceso.unidadCedenteResponsable
          ),
          campoTextoConTituloReporte(
            'Responsable receptor:',
            proceso.unidadReceptoraResponsable
          ),
        ],
      },
    ],
  },
  campoTextoConTituloReporte('Notas:', proceso.notas),
];
/**
 * DATOS AUTORIZACION DE SALIDA
 */
const seccionAutorizacionSalida = (proceso: any) => [
  {
    margin: [0, 10, 0, 0],
    columns: [
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Unidad Administrativa:',
            proceso.unidadAdministrativa
          ),
          campoTextoConTituloReporte(
            'Persona Autorizada:',
            proceso.personaAutorizada
          ),
        ],
      },
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Empresa Autorizada:',
            proceso.empresaAutorizada
          ),
          campoTextoConTituloReporte('', ''),
        ],
      },
    ],
  },
  campoTextoConTituloReporte('Explicación:', proceso.explicacion),
  campoTextoConTituloReporte('Notas:', proceso.notas),
];
/**
 * DATOS CAMBIO RESPONSABLE
 */
const seccionCambioResponsable = (proceso: any) => [
  {
    margin: [0, 10, 0, 0],
    columns: [
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            proceso.tipoResponsable + ' Anterior:',
            proceso.responsableActual
          ),
        ],
      },
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Nuevo ' + proceso.tipoResponsable + ':',
            proceso.nuevoResponsable
          ),
        ],
      },
    ],
  },
  campoTextoConTituloReporte('Observaciones:', proceso.observaciones),
];
/**
 * DATOS DEPRECIACION
 */
const seccionDepreciacion = (proceso: any) => [
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
/**
 * DATOS DESINCORPORACION
 */
const seccionDesincorporacion = (proceso: any) => [
  {
    margin: [0, 10, 0, 0],
    columns: [
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Causa de movimiento:',
            proceso.causaMovimiento
          ),
        ],
      },
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Unidad Administrativa:',
            proceso.unidadAdministrativa
          ),
        ],
      },
    ],
  },
  campoTextoConTituloReporte('Observaciones:', proceso.observaciones),
];
/**
 * DATOS ENTREGA UNIDAD
 */
const seccionEntregaUnidad = (proceso: any) => [
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
/**
 * DATOS INCORPORACION
 */
const seccionIncorporacion = (proceso: any) => [
  {
    columns: [
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Causa de Movimiento:',
            proceso.causaMovimiento
          ),
          campoTextoConTituloReporte('Sede:', proceso.sede),
          campoTextoConTituloReporte(
            'Responsable Primario:',
            proceso.responsablePrimario
          ),
        ],
      },
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte('Fecha de entrega:', proceso.fechaEntrega),
          campoTextoConTituloReporte(
            'Unidad Administrativa',
            proceso.unidadAdministrativa
          ),
          campoTextoConTituloReporte(
            'Responsable de Uso:',
            proceso.responsableUso
          ),
        ],
      },
    ],
  },
  campoTextoConTituloReporte('Observaciones:', proceso.observaciones),
];
/**
 * DATOS MODIFICACION
 */
const seccionModificacion = (proceso: any) => [
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
/**
 * DATOS REASIGNACION
 */
const seccionReasignacion = (proceso: any) => [
  {
    columns: [
      {
        width: '30%',
        stack: [
          campoTextoConTituloReporte(
            'Causa de Movimiento:',
            proceso.causaMovimiento
          ),
        ],
      },
      {
        width: '70%',
        stack: [campoTextoConTituloReporte('Sede:', proceso.sede)],
      },
    ],
  },
  {
    columns: [
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Responsable Primario:',
            proceso.responsablePrimario
          ),
        ],
      },
      {
        width: '50%',
        stack: [
          campoTextoConTituloReporte(
            'Responsable de Uso:',
            proceso.responsableUso
          ),
        ],
      },
    ],
  },
  campoTextoConTituloReporte(
    'Fecha de Entrega:',
    new Date(proceso.fechaEntrega).toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  ),
  campoTextoConTituloReporte('Observaciones:', proceso.observaciones),
];
/**
 * DATOS RETORNO
 */
const seccionRetorno = (proceso: any) => [
  campoTextoConTituloReporte('Beneficiario:', proceso.beneficiario),
  campoTextoConTituloReporte('Observaciones:', proceso.observaciones),
];
