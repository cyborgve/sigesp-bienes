import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import moment from 'moment';
import { FormGroup } from '@angular/forms';

export const filtrarProcesoPorFecha = (formularioRangoFechas: FormGroup) =>
  pipe(
    map((procesos: any[]) =>
      procesos.filter(proceso => {
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
          ? moment(proceso.creado).isBetween(fechaInicio, fechaFin)
          : moment(proceso.modificado).isBetween(fechaInicio, fechaFin);
      })
    )
  );
