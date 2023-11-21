import { switchMap, map } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { Id } from '@core/types/id';
import { Activo } from '@core/models/definiciones/activo';

export const filtrarActivosPorSede = (
  sede: Id,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((activos: Activo[]) => {
      if (sede === null || sede === 0) return of(activos);
      let sedesfiltradas = _activoUbicacion.buscarTodos().pipe(
        map(ubicaciones =>
          ubicaciones.filter(ubicacion => ubicacion.sedeId === sede)
        ),
        map(ubicaciones => ubicaciones.map(ubicacion => ubicacion.activoId))
      );
      return sedesfiltradas.pipe(
        map(ids => activos.filter(activo => ids.includes(activo.id)))
      );
    })
  );
