import { FormGroup } from '@angular/forms';
import { Integracion } from '@core/models/procesos/integracion';
import moment from 'moment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarIntegracionesPorFecha = (formulario: FormGroup) =>
  pipe(
    map((integraciones: Integracion[]) => {
      let { fechaReferencia, fechaInicio, fechaFin } = formulario.value;
      let nfechaInicio = moment(fechaInicio || new Date(1)).startOf('day');
      let nfechaFin = moment(fechaFin || new Date()).endOf('day');
      return integraciones.filter(integracion =>
        fechaReferencia === 'CREADO'
          ? moment(integracion.creado).isBetween(nfechaInicio, nfechaFin)
          : moment(integracion.modificado).isBetween(nfechaInicio, nfechaFin)
      );
    })
  );
