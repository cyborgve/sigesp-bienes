import { Desincorporacion } from '@core/models/procesos/desincorporacion';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { forkJoin, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const reversarDesincorporacion = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((desincorporacion: Desincorporacion) => {
      let ubicarActivos = desincorporacion.activos.map(activoProceso =>
        _activoUbicacion.buscarPorActivo(activoProceso.activo).pipe(
          map(ubicacion => {
            ubicacion.unidadAdministrativaId =
              desincorporacion.unidadAdministrativa;
            ubicacion.responsableId = undefined;
            ubicacion.responsableUsoId = undefined;
            return ubicacion;
          })
        )
      );
      return forkJoin(ubicarActivos).pipe(
        switchMap(ubicaciones => {
          let desincorporarActivos = ubicaciones.map(ubicacion =>
            _activoUbicacion.actualizar(
              ubicacion.id,
              ubicacion,
              undefined,
              false
            )
          );
          return forkJoin(desincorporarActivos).pipe(
            map(() => desincorporacion)
          );
        })
      );
    })
  );
