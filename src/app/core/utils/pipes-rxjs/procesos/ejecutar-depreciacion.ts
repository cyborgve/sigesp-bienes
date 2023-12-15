import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

export const ejecutarDepreciacion = (_depreciacion: DepreciacionService) =>
  pipe(tap);
