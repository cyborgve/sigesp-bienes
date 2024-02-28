import { UntypedFormGroup } from '@angular/forms';
import { Activo } from '@core/models/definiciones/activo';
import moment from 'moment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
export const filtrarActivosPorFecha = (formulario: UntypedFormGroup) =>
  pipe(
    map((activos: Activo[]) => {
      let { fechaInicio, fechaFin, fechaReferencia } = formulario.value;
      let nfechaInicio = moment(fechaInicio || new Date(1))
        .startOf('day')
        .subtract(1, 'millisecond');
      let nfechaFin = moment(fechaFin || new Date())
        .endOf('day')
        .add(1, 'millisecond');
      return activos.filter(activo => {
        return fechaReferencia === 'CREADO'
          ? moment(activo.creado).isBetween(nfechaInicio, nfechaFin)
          : moment(activo.modificado).isBetween(nfechaInicio, nfechaFin);
      });
    })
  );
