import { Depreciacion } from '@core/models/procesos/depreciacion';
import { calcularDepreciacion } from './depreciacion';
import moment from 'moment';
import 'moment/locale/es';

export const recalcularDepreciacion = (
  depreciacionExistente: Depreciacion,
  fechaModificacion: Date,
  valorTotalModificacion: number
) => {
  let indiceDepreciacionBase = depreciacionExistente.detalles.findIndex(
    detalle => {
      let fechaDetalle = moment(detalle.fecha).startOf('day').toDate();
      let fechaModificacionAdaptada = moment(fechaModificacion)
        .set('day', fechaDetalle.getDate())
        .subtract(1, 'months')
        .startOf('day')
        .toDate();
      return fechaDetalle.getTime() === fechaModificacionAdaptada.getTime();
    }
  );
  let detalleDepreciacionBase =
    depreciacionExistente.detalles[indiceDepreciacionBase];
};
