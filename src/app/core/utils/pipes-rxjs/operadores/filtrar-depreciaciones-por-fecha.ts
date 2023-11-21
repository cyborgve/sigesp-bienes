import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { FormGroup } from '@angular/forms';
import moment from 'moment';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';

export const filtrarDepreciacionesAnualesPorRangoDeFecha = (
  formularioRangoFechas: FormGroup
) =>
  pipe(
    map((depreciacionesDetalle: DetalleDepreciacion[]) =>
      depreciacionesDetalle.filter(depreciacionDetalle => {
        let fechaInicio = moment(formularioRangoFechas.value.fechaInicio);
        let fechaFin = moment(formularioRangoFechas.value.fechaFin);
        let fechaDepreciacion = moment(depreciacionDetalle.fecha);
        return fechaDepreciacion.isBetween(fechaInicio, fechaFin);
      })
    )
  );
