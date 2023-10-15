import { RangoFecha } from '@core/models/auxiliares/rango-fecha';
import moment from 'moment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtroRangoFechas = (rangoFecha: RangoFecha) =>
  pipe(
    map((procesos: any[]) =>
      procesos.filter(proceso => {
        let inicio = moment(rangoFecha.fechaInicio);
        let fin = moment(rangoFecha.fechaFin);
        return moment(proceso.creado).isBetween(inicio, fin);
      })
    )
  );
