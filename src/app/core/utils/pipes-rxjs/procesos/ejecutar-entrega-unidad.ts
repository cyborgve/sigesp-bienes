import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, pipe } from 'rxjs';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';

export const ejecutarEntregaUnidad = (
  _unidadAdministrativa: UnidadAdministrativaService,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((entregaUnidad: EntregaUnidad) => {
      return _unidadAdministrativa
        .buscarPorId(entregaUnidad.unidadAdministrativa)
        .pipe(
          switchMap(unidadAdministrativa => {
            unidadAdministrativa.responsable = entregaUnidad.nuevoResponsable;
            return _unidadAdministrativa
              .actualizar(
                unidadAdministrativa.id,
                unidadAdministrativa,
                undefined,
                false
              )
              .pipe(map(() => entregaUnidad));
          })
        );
    }),
    switchMap(entregaUnidad => {
      let buscarUbicaciones = entregaUnidad.activos.map(activoProceso =>
        _activoUbicacion.buscarPorId(activoProceso.activo).pipe(
          map(activoUbicacion => {
            activoUbicacion.responsableId = entregaUnidad.nuevoResponsable;
            return activoUbicacion;
          })
        )
      );
      return forkJoin(buscarUbicaciones).pipe(
        switchMap(ubicacionesEncontradas => {
          let actualizarUbicaciones = ubicacionesEncontradas.map(ubicacion =>
            _activoUbicacion.actualizar(
              ubicacion.id,
              ubicacion,
              undefined,
              false
            )
          );
          return forkJoin(actualizarUbicaciones).pipe(map(() => entregaUnidad));
        })
      );
    })
  );
