import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const reversarAutorizacionSalida = () =>
  pipe(map((autorizacionSalida: AutorizacionSalida) => autorizacionSalida));
