import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import moment from 'moment';
import { FormGroup } from '@angular/forms';

export const filtrarProcesoPorFecha = (formulario: FormGroup) =>
  pipe(
    map((procesos: any[]) => {
      let { fechaReferencia, fechaInicio, fechaFin } = formulario.value;
      let nfechaInicio = moment(fechaInicio || new Date(1)).startOf('day');
      let nfechaFin = moment(fechaFin || new Date()).endOf('day');
      return procesos.filter(proceso =>
        fechaReferencia === 'CREADO'
          ? moment(proceso.creado).isBetween(nfechaInicio, nfechaFin)
          : moment(proceso.modificado).isBetween(nfechaInicio, nfechaFin)
      );
    })
  );
