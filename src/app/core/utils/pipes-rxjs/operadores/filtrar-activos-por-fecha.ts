import { FormGroup } from '@angular/forms';
import { Activo } from '@core/models/definiciones/activo';
import moment from 'moment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
export const filtrarActivosPorFecha = (formularioRangoFechas: FormGroup) =>
  pipe(
    map((activos: Activo[]) =>
      activos.filter(activo => {
        let valores = formularioRangoFechas.value;
        let fechaInicio = valores.fechaInicio
          ? moment(valores.fechaInicio)
          : moment(new Date(1));
        let fechaFin = valores.fechaFin
          ? moment(valores.fechaFin)
          : moment(new Date());
        if (valores.rango === 'HOY' || valores.rango === 'AYER') {
          fechaInicio = fechaInicio.startOf('day');
          fechaFin = fechaInicio.endOf('day');
        }
        return valores.fechaReferencia === 'CREADO'
          ? moment(activo.creado).isBetween(fechaInicio, fechaFin)
          : moment(activo.modificado).isBetween(fechaInicio, fechaFin);
      })
    )
  );
