import { map, switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
export const filtrarActivosReferenciaEstadoDisponible = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      _activoUbicacion.buscarTodos().pipe(
        map(ubicaciones =>
          ubicaciones.filter(
            ubicacion =>
              ubicacion.referenciaEstado === null ||
              ubicacion.referenciaEstado === ''
          )
        ),
        map(ubicaciones => ubicaciones.map(ubicacion => ubicacion.activoId)),
        map(ids => activos.filter(activo => ids.includes(activo.id)))
      )
    )
  );
