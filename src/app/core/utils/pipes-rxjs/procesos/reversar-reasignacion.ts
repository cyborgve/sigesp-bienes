import { Reasignacion } from '@core/models/procesos/reasignacion';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { forkJoin, pipe } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export const reversarReasignacion = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((reasignacion: Reasignacion) => {
      let buscarUbicacionesActivos = reasignacion.activos.map(
        activoProcesoReasignacion =>
          _activoUbicacion
            .buscarPorActivo(activoProcesoReasignacion.activo)
            .pipe(
              map(ubicacion => {
                ubicacion.responsableId =
                  activoProcesoReasignacion.responsableAnterior;
                ubicacion.responsableUsoId =
                  activoProcesoReasignacion.responsableUsoAnterior;
                return ubicacion;
              })
            )
      );
      return forkJoin(buscarUbicacionesActivos).pipe(
        switchMap(ubicaciones => {
          let actualizarUbicaciones = ubicaciones.map(ubicacion =>
            _activoUbicacion.actualizar(
              ubicacion.id,
              ubicacion,
              undefined,
              false
            )
          );
          return forkJoin(actualizarUbicaciones).pipe(map(() => reasignacion));
        })
      );
    })
  );
