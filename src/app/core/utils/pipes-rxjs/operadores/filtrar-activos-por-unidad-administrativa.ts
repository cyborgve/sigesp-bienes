import { map, switchMap, tap } from 'rxjs/operators';
import { Activo } from '@core/models/definiciones/activo';
import { Id } from '@core/types/id';
import { pipe, of } from 'rxjs';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';

export const filtrarActivosPorUnidadAdministrativa = (
  unidadAdministrativa: Id,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((activos: Activo[]) => {
      if (unidadAdministrativa === null || unidadAdministrativa === 0)
        return of(activos);
      let filtrarUbicaciones = _activoUbicacion.buscarTodos().pipe(
        map(ubicaciones =>
          ubicaciones.filter(
            ubicacion =>
              ubicacion.unidadAdministrativaId === unidadAdministrativa
          )
        ),
        map(ubicaciones => ubicaciones.map(ubicacion => ubicacion.activoId))
      );
      return filtrarUbicaciones.pipe(
        map(ids => activos.filter(activo => ids.includes(activo.id)))
      );
    })
  );
