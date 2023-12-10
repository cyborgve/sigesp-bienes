import { Activo } from '@core/models/definiciones/activo';
import { ActivoDetalleService } from '@core/services/definiciones/activo-detalle.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorCentroCostos = (
  centroCostos: Id,
  _activoDetalle: ActivoDetalleService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      centroCostos && centroCostos !== 'Todos'
        ? _activoDetalle.buscarTodos().pipe(
            map(detalles =>
              detalles.filter(
                detalle => detalle.codigoCentroCostos === centroCostos
              )
            ),
            map(detalles => detalles.map(detalle => detalle.activoId)),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
