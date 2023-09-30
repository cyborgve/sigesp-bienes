import { switchMap, map } from 'rxjs/operators';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { forkJoin, pipe } from 'rxjs';
import { Incorporacion } from '@core/models/procesos/incorporacion';

export const ejecutarIncorporacion = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((incorporacion: Incorporacion) => {
      let ubicarActivos = incorporacion.activos.map(activoProceso =>
        _activoUbicacion.buscarPorActivo(activoProceso.activo).pipe(
          map(activoUbicacion => {
            activoUbicacion.unidadAdministrativaId =
              incorporacion.unidadAdministrativa;
            activoUbicacion.sedeId = incorporacion.sede;
            activoUbicacion.responsableId = incorporacion.responsablePrimario;
            activoUbicacion.responsableUsoId = incorporacion.responsableUso;
            activoUbicacion.fechaIngreso = incorporacion.fechaEntrega;
            return activoUbicacion;
          })
        )
      );
      return forkJoin(ubicarActivos).pipe(
        switchMap(activosUbicacion => {
          let incorporarActivos = activosUbicacion.map(activoUbicacion =>
            _activoUbicacion.actualizar(
              activoUbicacion.id,
              activoUbicacion,
              undefined,
              false
            )
          );
          return forkJoin(incorporarActivos).pipe(map(() => incorporacion));
        })
      );
    })
  );
