import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';
import { UntypedFormGroup } from '@angular/forms';
import moment from 'moment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarActivosRetornoPorFecha = (formulario: UntypedFormGroup) =>
  pipe(
    map((activosRetorno: ActivoListaRetorno[]) => {
      let { fechaInicio, fechaFin } = formulario.value;
      let nfechaInicio = moment(fechaInicio || new Date(1)).startOf('day');
      let nfechaFin = moment(fechaFin || new Date()).endOf('day');
      return activosRetorno.filter(activo =>
        moment(activo.fechaProceso).isBetween(nfechaInicio, nfechaFin)
      );
    })
  );
