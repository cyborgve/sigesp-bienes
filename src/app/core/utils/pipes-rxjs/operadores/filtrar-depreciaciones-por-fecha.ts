import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { FormGroup } from '@angular/forms';
import moment from 'moment';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';

export const filtrarDepreciacionesAnualesPorRangoDeFecha = (
  formularioRangoFechas: FormGroup
) =>
  pipe(
    map((activosListaDepreciacion: ActivoListaDepreciacion[]) =>
      activosListaDepreciacion.filter(activoListaDepreciacion => {
        let fechaInicio = moment(formularioRangoFechas.value.fechaInicio);
        let fechaFin = moment(formularioRangoFechas.value.fechaFin);
        let fechaDepreciacion = moment(
          activoListaDepreciacion.fechaDepreciacion
        );
        return fechaDepreciacion.isBetween(fechaInicio, fechaFin);
      })
    )
  );
