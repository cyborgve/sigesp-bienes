import { Activo } from '@core/models/definiciones/activo';
import { ActivoDetalleService } from '@core/services/definiciones/activo-detalle.service';
import { OrigenService } from '@core/services/definiciones/origen.service';
import { Id } from '@core/types/id';
import { pipe, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorOrigen = (
  origen: Id,
  _activoDetalle: ActivoDetalleService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      origen && origen !== 0
        ? _activoDetalle.buscarTodos().pipe(
            map(detalles =>
              detalles
                .filter(detalle => detalle.origenId === origen)
                .map(detalle => detalle.activoId)
            ),
            map(origenes =>
              activos.filter(activo => origenes.includes(activo.id))
            )
          )
        : of(activos)
    )
  );
