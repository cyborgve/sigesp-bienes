import { FormGroup } from '@angular/forms';
import { Activo } from '@core/models/definiciones/activo';
import moment from 'moment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
export const filtrarActivosPorFecha = (formularioRangoFechas: FormGroup) =>
  pipe(
    map((activos: Activo[]) =>
      activos.filter(activo => {
        let fechaInicio = formularioRangoFechas.value.fechaInicio
          ? moment(formularioRangoFechas.value.fechaInicio)
          : moment(new Date(1));
        let fechaFin = formularioRangoFechas.value.fechaFin
          ? moment(formularioRangoFechas.value.fechaFin)
          : moment(new Date());
        if (
          formularioRangoFechas.value.rango === 'HOY' ||
          formularioRangoFechas.value.rango === 'AYER'
        ) {
          fechaInicio = fechaInicio.startOf('day');
          fechaFin = fechaInicio.endOf('day');
        }
        return formularioRangoFechas.value.fechaReferencia === 'CREADO'
          ? moment(activo.creado).isBetween(fechaInicio, fechaFin)
          : moment(activo.modificado).isBetween(fechaInicio, fechaFin);
      })
    )
  );
