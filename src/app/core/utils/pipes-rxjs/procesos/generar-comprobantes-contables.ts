import { Integracion } from '@core/models/procesos/integracion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { from, pipe } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

export const generarComprobantesContables = (
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService
) =>
  pipe(
    mergeMap((integraciones: Integracion[]) =>
      from(integraciones).pipe(
        groupBy(integracion => integracion.tipoProceso),
        mergeMap(grupos$ => grupos$.pipe(toArray())),
        toArray()
      )
    )
  );
