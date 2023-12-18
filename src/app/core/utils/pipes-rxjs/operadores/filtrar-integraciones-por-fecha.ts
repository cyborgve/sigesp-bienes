import { FormGroup } from '@angular/forms';
import { Integracion } from '@core/models/procesos/integracion';
import moment from 'moment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarIntegracionesPorFecha = (
  formularioRangoFechas: FormGroup
) =>
  pipe(
    map((integraciones: Integracion[]) =>
      integraciones.filter(integracion => {
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
          ? moment(integracion.creado).isBetween(fechaInicio, fechaFin)
          : moment(integracion.modificado).isBetween(fechaInicio, fechaFin);
      })
    )
  );
