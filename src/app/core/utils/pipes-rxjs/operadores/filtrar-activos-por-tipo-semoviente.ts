import { Activo } from '@core/models/definiciones/activo';
import { ActivoDetalleService } from '@core/services/definiciones/activo-detalle.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorTipoSemoviente = (
  tipoSemoviente: Id,
  _activoDetalle: ActivoDetalleService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      tipoSemoviente && tipoSemoviente !== 0
        ? _activoDetalle.buscarTodos().pipe(
            map(detalles =>
              detalles.filter(
                detalle => detalle.tipoSemovienteId === tipoSemoviente
              )
            ),
            map(detalles => detalles.map(detalle => detalle.activoId)),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
