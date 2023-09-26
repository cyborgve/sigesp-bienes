import { Reasignacion } from './../../models/procesos/reasignacion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const ejecutarReasignacion = () =>
  pipe(map((reasignacion: Reasignacion) => reasignacion));
