import { PROCESOS_INTEGRABLES } from '@core/constants/procesos-integrables';
import { Integracion } from '@core/models/procesos/integracion';
import { TipoProceso } from '@core/types/tipo-proceso';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarIntegracionesPorEstadoIntegracion = (
  estadoIntegracion: string
) =>
  pipe(
    map((integraciones: Integracion[]) => {
      if (estadoIntegracion === 'INTEGRADOS')
        return integraciones.filter(integracion => {
          if (procesoIntegrable(integracion.procesoTipo))
            return integracion.integrado === 1;
          return true;
        });
      if (estadoIntegracion === 'NO INTEGRADOS')
        return integraciones.filter(integracion => {
          if (procesoIntegrable(integracion.procesoTipo))
            return integracion.integrado === 0;
          return true;
        });
      return integraciones;
    })
  );

const procesoIntegrable = (tipoProceso: TipoProceso) =>
  PROCESOS_INTEGRABLES.some(proceso => proceso === tipoProceso);
