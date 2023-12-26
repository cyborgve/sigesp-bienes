import { Desincorporacion } from '@core/models/procesos/desincorporacion';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { forkJoin, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const reversarDesincorporacion = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((desincorporacion: Desincorporacion) => {
      let { ubicaciones } = desincorporacion;
      let buscarActivosUbicacion = ubicaciones.map(ubicacion =>
        _activoUbicacion.buscarPorActivo(ubicacion.activo).pipe(
          map(activoUbicacion => {
            activoUbicacion.unidadAdministrativaId =
              ubicacion.unidadAdministrativa;
            activoUbicacion.sedeId = ubicacion.sede;
            activoUbicacion.responsableId = ubicacion.responsable;
            activoUbicacion.responsableUsoId = ubicacion.responsableUso;
            return activoUbicacion;
          })
        )
      );
      return forkJoin(buscarActivosUbicacion).pipe(
        switchMap(activosUbicacion => {
          let reversar = activosUbicacion.map(activoUbicacion =>
            _activoUbicacion.actualizar(
              activoUbicacion.id,
              activoUbicacion,
              undefined,
              false
            )
          );
          return forkJoin(reversar).pipe(map(() => desincorporacion));
        })
      );
    })
  );
