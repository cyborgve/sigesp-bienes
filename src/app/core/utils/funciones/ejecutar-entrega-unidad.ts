import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

export const ejecutarEntregaUnidad = () =>
  pipe(map((entregaUnidad: EntregaUnidad) => entregaUnidad));
