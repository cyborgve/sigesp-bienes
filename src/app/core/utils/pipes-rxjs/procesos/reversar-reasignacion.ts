import { Reasignacion } from '@core/models/procesos/reasignacion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const reversarReasignacion = () =>
  pipe(map((reasignacion: Reasignacion) => reasignacion));
