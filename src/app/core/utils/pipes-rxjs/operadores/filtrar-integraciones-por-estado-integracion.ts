import { Integracion } from '@core/models/procesos/integracion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarIntegracionesPorEstadoIntegracion = (
  estadoAprobacion: string
) =>
  pipe(
    map((integraciones: Integracion[]) => {
      if (estadoAprobacion === 'INTEGRADOS')
        return integraciones.filter(integracion => integracion.aprobado == 1);
      if (estadoAprobacion === 'NO INTEGRADOS')
        return integraciones.filter(integracion => integracion.aprobado == 0);
      return integraciones;
    })
  );