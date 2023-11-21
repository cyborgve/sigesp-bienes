import { Activo } from '@core/models/definiciones/activo';
import { ActivoDetalleService } from '@core/services/definiciones/activo-detalle.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorRaza = (
  raza: Id,
  _activoDetalle: ActivoDetalleService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      raza && raza !== 0
        ? _activoDetalle.buscarTodos().pipe(
            map(detalles =>
              detalles.filter(detalle => detalle.razaId === raza)
            ),
            map(detalles => detalles.map(detalle => detalle.activoId)),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
