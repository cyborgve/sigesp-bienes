import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { FormGroup } from '@angular/forms';
import moment from 'moment';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';

export const filtrarDepreciacionesAnualesPorRangoDeFecha = (
  formulario: FormGroup
) =>
  pipe(
    map((activosListaDepreciacion: ActivoListaDepreciacion[]) => {
      let { fechaInicio, fechaFin } = formulario.value;
      let nfechaInicio = moment(fechaInicio || new Date(1)).startOf('day');
      let nfechaFin = moment(fechaFin || new Date()).endOf('day');
      return activosListaDepreciacion.filter(activo =>
        moment(activo.fechaDepreciacion).isBetween(nfechaInicio, nfechaFin)
      );
    })
  );
