import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { AutorizacionSalidaService } from '@core/services/procesos/autorizacion-salida.service';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const ejecutarAutorizacionSalida = (
  _autorizacionSalida: AutorizacionSalidaService
) => pipe(map((autorizacionSalida: AutorizacionSalida) => autorizacionSalida));
