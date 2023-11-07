import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import moment from 'moment';
import { FormGroup } from '@angular/forms';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';

export const filtrarDepreciacionesMensualesPorFecha = (
  formularioRangoFechas: FormGroup
) =>
  pipe(
    map((depreciacionesMensuales: DetalleDepreciacion[]) =>
      depreciacionesMensuales.filter(depreciacionMensual => {
        let fechaDepreciacion = moment(depreciacionMensual.fecha);
        let fechaInicio = moment(formularioRangoFechas.value.fechaInicio);
        let fechaFin = moment(formularioRangoFechas.value.fechaFin);
        if (formularioRangoFechas.value.rango === 'TODOS') {
          fechaInicio = moment(new Date(1));
          fechaFin = moment(new Date());
        }

        if (
          formularioRangoFechas.value.rango === 'HOY' ||
          formularioRangoFechas.value.rango === 'AYER'
        ) {
          fechaInicio = moment(formularioRangoFechas.value.fechaInicio).startOf(
            'day'
          );
          fechaFin = fechaInicio.endOf('day');
        }

        return fechaDepreciacion.isBetween(fechaInicio, fechaFin);
      })
    )
  );
