import { map, switchMap } from 'rxjs/operators';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { forkJoin, pipe } from 'rxjs';

export const ejecutarPrestamo = (_activoUbicacion: ActivoUbicacionService) =>
  pipe(
    switchMap((actaPrestamo: ActaPrestamo) =>
      forkJoin(
        actaPrestamo.activos.map(activo =>
          _activoUbicacion.buscarPorActivo(activo.activo).pipe(
            map(ubicacion => {
              ubicacion.unidadAdministrativaId =
                actaPrestamo.unidadAdministrativaReceptora;
              ubicacion.responsableUsoId =
                actaPrestamo.unidadReceptoraResponsable;
              return ubicacion;
            })
          )
        )
      ).pipe(
        switchMap(ejecutarPrestamo =>
          forkJoin(ejecutarPrestamo).pipe(map(() => actaPrestamo))
        )
      )
    )
  );

// switchMap(actaPrestamoGuradada => {
//       let ubicarActivos = actaPrestamoGuradada.activos.map(activoProceso =>
//         this._activoUbicacion.buscarPorId(activoProceso.activo).pipe(
//           map(activoUbicacion => {
//             activoUbicacion.unidadAdministrativaId =
//               actaPrestamoGuradada.unidadAdministrativaReceptora;
//             activoUbicacion.responsableUsoId =
//               actaPrestamoGuradada.unidadReceptoraResponsable;
//             return activoUbicacion;
//           })
//         )
//       );
//       return forkJoin(ubicarActivos).pipe(
//         switchMap(activosUbicados => {
//           let prestarActivos = activosUbicados.map(activoUbicado =>
//             this._activoUbicacion.actualizar(
//               activoUbicado.id,
//               activoUbicado,
//               undefined,
//               false
//             )
//           );
//           return forkJoin(prestarActivos).pipe(
//             map(() => actaPrestamoGuradada)
//           );
//         })
//       );
//     }),
