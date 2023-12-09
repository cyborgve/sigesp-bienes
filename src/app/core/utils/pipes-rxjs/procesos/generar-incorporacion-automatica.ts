import { Activo } from '@core/models/definiciones/activo';
import { IncorporacionService } from '@core/services/procesos/incorporacion.service';
import { of, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const generarIncorporacionAutomatica = () =>
  pipe(switchMap((activo: Activo) => of(activo)));
