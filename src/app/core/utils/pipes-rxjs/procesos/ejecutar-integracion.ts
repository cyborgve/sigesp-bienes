import { IntegracionService } from '@core/services/procesos/integracion.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

export const ejecutarIntegracion = (_integracion: IntegracionService) =>
  pipe(tap());
