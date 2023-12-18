import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { forkJoin, pipe } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export const reversarAutorizacionSalida = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((autorizacionSalida: AutorizacionSalida) => {
      let buscarUbicaciones = autorizacionSalida.activos.map(activoProceso =>
        _activoUbicacion.buscarPorId(activoProceso.activo).pipe(
          map(ubicacion => {
            ubicacion.referenciaEstado = null;
            return ubicacion;
          })
        )
      );
      return forkJoin(buscarUbicaciones).pipe(
        switchMap(ubicacionesEncontradas => {
          let actualizarUbicaciones = ubicacionesEncontradas
            .map(ubicacion => {
              ubicacion.referenciaEstado = null;
              return ubicacion;
            })
            .map(ubicacion =>
              _activoUbicacion.actualizar(
                ubicacion.id,
                ubicacion,
                undefined,
                false
              )
            );
          return forkJoin(actualizarUbicaciones).pipe(
            map(() => autorizacionSalida)
          );
        })
      );
    })
  );
