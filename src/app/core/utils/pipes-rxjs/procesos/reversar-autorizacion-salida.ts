import { AutorizacionSalidaService } from '@core/services/procesos/autorizacion-salida.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

export const reversarAutorizacionSalida = (
  _autorizacionSalida: AutorizacionSalidaService
) => pipe(tap());
