import { Integracion } from '@core/models/procesos/integracion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const ordenarIntegracionesPorFechaDescendiente = () =>
  pipe(
    map((integraciones: Integracion[]) =>
      integraciones.sort((a, b) => (a.creado > b.creado ? 1 : -1))
    )
  );
