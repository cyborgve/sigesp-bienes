import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import moment from 'moment';
import { FormGroup } from '@angular/forms';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';

export const filtrarDepreciacionesMensualesPorFecha = (
  formularioRangoFechas: FormGroup
) =>
  pipe(
    map((depreciacionesMensuales: ActivoListaDepreciacion[]) =>
      depreciacionesMensuales.filter(depreciacionMensual => {
        let fechaDepreciacion = moment(depreciacionMensual.fechaDepreciacion);
        let fechaInicio = moment(formularioRangoFechas.value.fechaInicio)
          .startOf('day')
          .subtract(1, 'millisecond');
        let fechaFin = moment(formularioRangoFechas.value.fechaFin)
          .endOf('day')
          .add(1, 'millisecond');
        if (formularioRangoFechas.value.rango === 'TODOS') {
          fechaInicio = moment(new Date(1));
          fechaFin = moment(new Date());
        }
        return fechaDepreciacion.isBetween(fechaInicio, fechaFin);
      })
    )
  );
