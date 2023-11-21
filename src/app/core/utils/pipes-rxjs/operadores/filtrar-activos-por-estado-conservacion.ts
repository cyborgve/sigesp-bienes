import { Activo } from '@core/models/definiciones/activo';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorEstadoConservacion = (
  estadoConservacion: Id,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      estadoConservacion && estadoConservacion !== 0
        ? _activoUbicacion.buscarTodos().pipe(
            map(ubicaciones =>
              ubicaciones.filter(
                ubicacion =>
                  ubicacion.estadoConservacionId === estadoConservacion
              )
            ),
            map(ubicaciones =>
              ubicaciones.map(ubicacion => ubicacion.activoId)
            ),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
