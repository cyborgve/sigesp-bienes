import { Activo } from '@core/models/definiciones/activo';
import { ActivoDetalleService } from '@core/services/definiciones/activo-detalle.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorClase = (
  clase: Id,
  _activoDetalle: ActivoDetalleService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      clase && clase !== 0
        ? _activoDetalle.buscarTodos().pipe(
            map(detalles =>
              detalles.filter(detalle => detalle.claseId === clase)
            ),
            map(detalles => detalles.map(detalle => detalle.activoId)),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
