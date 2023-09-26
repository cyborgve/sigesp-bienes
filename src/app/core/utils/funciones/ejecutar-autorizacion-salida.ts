import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const ejecutarAutorizacionSalida = () =>
  pipe(map((autorizacionSalida: AutorizacionSalida) => autorizacionSalida));
