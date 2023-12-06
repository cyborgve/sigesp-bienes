import { switchMap, map } from 'rxjs/operators';
import { forkJoin, pipe } from 'rxjs';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';

export const ejecutarActaPrestamo = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((actaPrestamo: ActaPrestamo) => {
      let ubicarActivos = actaPrestamo.activos.map(activoProceso =>
        _activoUbicacion.buscarPorId(activoProceso.activo).pipe(
          map(activoUbicacion => {
            activoUbicacion.unidadAdministrativaId =
              actaPrestamo.unidadAdministrativaReceptora;
            activoUbicacion.responsableId =
              actaPrestamo.unidadReceptoraResponsable;
            activoUbicacion.referenciaEstado =
              'ACTA DE PRÉSTAMO-' + actaPrestamo.id;
            return activoUbicacion;
          })
        )
      );
      return forkJoin(ubicarActivos).pipe(
        switchMap(activosUbicados => {
          let prestarActivos = activosUbicados.map(activoUbicado =>
            _activoUbicacion.actualizar(
              activoUbicado.id,
              activoUbicado,
              undefined,
              false
            )
          );
          return forkJoin(prestarActivos).pipe(map(() => actaPrestamo));
        })
      );
    })
  );
