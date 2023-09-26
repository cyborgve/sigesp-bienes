import { switchMap, map } from 'rxjs/operators';
import { pipe, forkJoin } from 'rxjs';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
export const reversarActaPrestamo = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((actaPrestamo: ActaPrestamo) => {
      let ubicarActivos = actaPrestamo.activos.map(activoProceso =>
        _activoUbicacion.buscarPorActivo(activoProceso.activo)
      );
      return forkJoin(ubicarActivos).pipe(
        switchMap(activosUbicados => {
          let reversarPrestamo = activosUbicados
            .map(activoUbicacion => {
              activoUbicacion.unidadAdministrativaId =
                actaPrestamo.unidadAdministrativaCedente;
              activoUbicacion.responsableUsoId =
                actaPrestamo.unidadCedenteResponsable;
              return activoUbicacion;
            })
            .map(activoUbicacion =>
              _activoUbicacion.actualizar(
                activoUbicacion.id,
                activoUbicacion,
                undefined,
                false
              )
            );
          return forkJoin(reversarPrestamo).pipe(map(() => actaPrestamo));
        })
      );
    })
  );
