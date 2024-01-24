import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { UntypedFormGroup } from '@angular/forms';
import moment from 'moment';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';

export const filtrarDepreciacionesAnualesPorRangoDeFecha = (
  formulario: UntypedFormGroup
) =>
  pipe(
    map((activosListaDepreciacion: ActivoListaDepreciacion[]) => {
      let { fechaInicio, fechaFin } = formulario.value;
      let nfechaInicio = moment(fechaInicio || new Date(1))
        .startOf('day')
        .subtract(1, 'millisecond');
      let nfechaFin = moment(fechaFin || new Date())
        .endOf('day')
        .add(1, 'millisecond');
      return activosListaDepreciacion.filter(activo =>
        moment(activo.fechaDepreciacion).isBetween(nfechaInicio, nfechaFin)
      );
    })
  );
