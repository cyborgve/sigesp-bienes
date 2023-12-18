import { ReasignacionService } from '@core/services/procesos/reasignacion.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

export const reversarReasignacion = (_reasignacion: ReasignacionService) =>
  pipe(tap());
