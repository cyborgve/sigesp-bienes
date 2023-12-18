import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { forkJoin, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const ejecutarAutorizacionSalida = (
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((autorizacionSalida: AutorizacionSalida) => {
      let { activos } = autorizacionSalida;
      let buscarUbicaciones = activos.map(activo =>
        _activoUbicacion.buscarPorId(activo.activo)
      );
      return forkJoin(buscarUbicaciones).pipe(
        switchMap(ubicacionesEncontradas => {
          let actualizarUbicaciones = ubicacionesEncontradas
            .map(ubicacion => {
              ubicacion.referenciaEstado = `AUTORIZACIÓN DE SALIDA-${autorizacionSalida.comprobante.substring(
                5
              )},${autorizacionSalida.id}`;
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
