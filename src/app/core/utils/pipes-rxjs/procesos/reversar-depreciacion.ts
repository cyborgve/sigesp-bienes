import { Depreciacion } from '@core/models/procesos/depreciacion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const reversarDepreciacion = () =>
  pipe(map((depreciacion: Depreciacion) => depreciacion));
