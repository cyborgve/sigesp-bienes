import { Depreciacion } from '@core/models/procesos/depreciacion';
import { calcularDepreciacion } from './depreciacion';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
import moment from 'moment';

export const recalcularDepreciacion = (
  depreciacionExistente: Depreciacion,
  fechaModificacion: Date,
  valorTotalComponentes: number
): Depreciacion => {
  // Obtener la depreciación antes de la modificación
  let indice = depreciacionExistente.detalles.findIndex(detalle => {
    let fechaDetalle = moment(detalle.fecha).startOf('day').toDate();
    let fechaModificacionAdaptada = moment(fechaModificacion)
      .set('day', fechaDetalle.getDate())
      .subtract(1, 'months')
      .startOf('day')
      .toDate();
    return fechaDetalle.getTime() === fechaModificacionAdaptada.getTime();
  });
  const depreciacionAntesModificacion = {
    anual: depreciacionExistente.depreciacionAnual,
    mensual: depreciacionExistente.depreciacionMensual,
    detalles: depreciacionExistente.detalles.slice(0, indice + 1),
  };

  // Calcular la nueva base de depreciación
  const nuevaBaseDepreciacion =
    depreciacionExistente.costo + valorTotalComponentes;

  // Calcular la depreciación restante después de la modificación
  const depreciacionDespuesModificacion = calcularDepreciacion(
    nuevaBaseDepreciacion,
    fechaModificacion,
    depreciacionExistente.vidaUtil,
    'MESES',
    depreciacionExistente.valorRescate,
    METODOS_DEPRECIACION.find(
      md => md.substring(0, 3) === depreciacionExistente.metodo
    )
  );

  // Filtrar detalles de depreciación posteriores a la fecha de modificación
  const detallesDespuesModificacion =
    depreciacionDespuesModificacion.detalles.filter(
      detalle => detalle.fecha > fechaModificacion
    );

  // Sumar la depreciación antes y después de la modificación
  const depreciacionTotal = depreciacionExistente;
  // Propiedades específicas de tu interfaz Depreciacion
  depreciacionTotal.depreciacionAnual =
    depreciacionAntesModificacion.anual + depreciacionDespuesModificacion.anual;
  depreciacionTotal.depreciacionMensual =
    depreciacionAntesModificacion.mensual +
    depreciacionDespuesModificacion.mensual;
  depreciacionTotal.detalles = [
    ...depreciacionAntesModificacion.detalles,
    ...detallesDespuesModificacion,
    ...depreciacionDespuesModificacion.detalles,
  ];

  return depreciacionTotal;
};

// import { Depreciacion } from '@core/models/procesos/depreciacion';
// import { calcularDepreciacion } from './depreciacion';
// import moment from 'moment';
// import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
// import { UnidadDeTiempo } from '@core/types/unidades-tiempo';

// export const recalcularDepreciacion = (
//   depreciacionExistente: Depreciacion,
//   fechaModificacion: Date,
//   valorTotalModificacion: number
// ) => {
//   let { detalles, valorRescate, metodo } = depreciacionExistente;
//   let indice = detalles.findIndex(detalle => {
//     let fechaDetalle = moment(detalle.fecha).startOf('day').toDate();
//     let fechaModificacionAdaptada = moment(fechaModificacion)
//       .set('day', fechaDetalle.getDate())
//       .subtract(1, 'months')
//       .startOf('day')
//       .toDate();
//     return fechaDetalle.getTime() === fechaModificacionAdaptada.getTime();
//   });
//   let metodoDepreciacion = METODOS_DEPRECIACION.find(
//     met => met.substring(0, 3) === metodo
//   );
//   let depreciacionBase = detalles[indice];
//   let vidaUtil = depreciacionExistente.vidaUtil - depreciacionBase.meses;
//   let unidadVidaUtil: UnidadDeTiempo = 'MESES';
//   let valorInicial = depreciacionBase.valorContable + valorTotalModificacion;

//   let nuevaDepreciacionCalculada = calcularDepreciacion(
//     valorInicial,
//     fechaModificacion,
//     vidaUtil,
//     unidadVidaUtil,
//     valorRescate,
//     metodoDepreciacion
//   );

//   depreciacionExistente.depreciacionMensual =
//     nuevaDepreciacionCalculada.mensual;
//   depreciacionExistente.depreciacionAnual = nuevaDepreciacionCalculada.anual;
//   let modificacionDetalles = detalles.slice(indice + 1).map((detalle, ind) => {
//     detalle.proceso = depreciacionExistente.id;
//     detalle.depreciacionAcumulada +=
//       nuevaDepreciacionCalculada.detalles[ind].depreciacionAcumulada;
//     detalle.depreciacionAnual =
//       nuevaDepreciacionCalculada.detalles[ind].depreciacionAnual;
//     detalle.depreciacionMensual =
//       nuevaDepreciacionCalculada.detalles[ind].depreciacionMensual;
//     detalle.valorContable =
//       nuevaDepreciacionCalculada.detalles[ind].valorContable;
//     return detalle;
//   });
//   depreciacionExistente.detalles = [
//     ...detalles.slice(0, indice + 1).map(detalle => {
//       detalle.proceso = depreciacionExistente.id;
//       return detalle;
//     }),
//     ...modificacionDetalles,
//   ];
//   return depreciacionExistente;
// };
