import { map, switchMap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { Id } from '@core/types/id';

export const filtrarActivosPorResponsable = (
  responsable: Id,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((activos: Activo[]) => {
      if (responsable === null || responsable === 'Todos') return of(activos);
      let idsResponsables = _activoUbicacion.buscarTodos().pipe(
        map(ubicaciones =>
          ubicaciones.filter(
            ubicacion =>
              ubicacion.responsableId === responsable ||
              ubicacion.responsableUsoId === responsable
          )
        ),
        map(ubicaciones => ubicaciones.map(ubicacion => ubicacion.activoId))
      );
      return idsResponsables.pipe(
        map(ids => activos.filter(activo => ids.includes(activo.id)))
      );
    })
  );
