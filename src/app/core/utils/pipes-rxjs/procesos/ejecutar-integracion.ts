import { Integracion } from '@core/models/procesos/integracion';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilizacion.service';
import { Id } from '@core/types/id';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const procesosIntegrables = [
  'DEPRECIACIÓN MENSUAL',
  'DESINCORPORACIÓN',
  'MODIFICACIÓN',
];

export const ejecutarIntegracion = (
  _contabilizacion: ContabilizacionService,
  lineEnterprise: Id
) =>
  pipe(
    map((integraciones: Integracion[]) =>
      integraciones.filter(integracion =>
        procesosIntegrables.includes(integracion.tipoProceso)
      )
    )
  );
