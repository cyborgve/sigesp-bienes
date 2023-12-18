import { Integracion } from '@core/models/procesos/integracion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarIntegracionesPorEstadoAprobacion = (
  estadoAprobacion: string
) =>
  pipe(
    map((integraciones: Integracion[]) => {
      if (estadoAprobacion === 'APROBADOS')
        return integraciones.filter(integracion => integracion.aprobado);
      if (estadoAprobacion === 'NO APROBADOS')
        return integraciones.filter(integracion => !integracion.aprobado);
      return integraciones;
    })
  );
