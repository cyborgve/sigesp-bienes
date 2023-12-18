import { Integracion } from '@core/models/procesos/integracion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarIntegracionesPorTipoProceso = (tipoProceso: string) =>
  pipe(
    map((integraciones: Integracion[]) =>
      tipoProceso !== 'TODOS'
        ? integraciones.filter(
            integracion => integracion.tipoProceso === tipoProceso
          )
        : integraciones
    )
  );
