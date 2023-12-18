import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

export const reversarDepreciacion = (_depreciacion: DepreciacionService) =>
  pipe(tap());
