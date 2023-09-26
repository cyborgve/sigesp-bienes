import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const reversarEntregaUnidad = () =>
  pipe(map((entregaUnidad: EntregaUnidad) => entregaUnidad));
