import { PROCESOS_INTEGRABLES } from '@core/constants/procesos-integrables';
import { Integracion } from '@core/models/procesos/integracion';
import { TipoProceso } from '@core/types/tipo-proceso';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarIntegracionesPorTipoProceso = (tipoProceso: string) =>
  pipe(
    map((integraciones: Integracion[]) => {
      if (tipoProceso === 'TODOS INTEGRABLES')
        return integraciones.filter(integracion =>
          procesoIntegrable(integracion.procesoTipo)
        );
      if (tipoProceso !== 'TODOS' && tipoProceso !== 'TODOS INTEGRABLES')
        return integraciones.filter(
          integracion => integracion.procesoTipo === tipoProceso
        );
      return integraciones;
    })
  );

const procesoIntegrable = (tipoProceso: TipoProceso) =>
  PROCESOS_INTEGRABLES.some(tipoIntegrable => tipoIntegrable === tipoProceso);
