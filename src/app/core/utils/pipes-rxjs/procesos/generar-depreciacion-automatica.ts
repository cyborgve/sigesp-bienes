import { Activo } from '@core/models/definiciones/activo';
import { of, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const generarDepreciacionAutomatica = () =>
  pipe(switchMap((activo: Activo) => of(activo)));
