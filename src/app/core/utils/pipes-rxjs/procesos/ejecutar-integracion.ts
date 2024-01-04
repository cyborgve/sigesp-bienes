import { Integracion } from '@core/models/procesos/integracion';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilizacion.service';
import { of, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const procesosIntegrables = [
  'DEPRECIACIÓN',
  'DESINCORPORACIÓN',
  'MODIFICACIÓN',
];

export const ejecutarIntegracion = (_contabilizacion: ContabilizacionService) =>
  pipe(
    switchMap((integraciones: Integracion[]) => {
      let procesosPorIntegrar = integraciones.filter(integracion =>
        procesosIntegrables.includes(integracion.tipoProceso)
      );
      return of(procesosPorIntegrar);
    })
  );
