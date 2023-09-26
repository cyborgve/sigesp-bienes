import { Depreciacion } from '@core/models/procesos/depreciacion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const ejecutarDepreciacion = () =>
  pipe(map((depreciacion: Depreciacion) => depreciacion));
