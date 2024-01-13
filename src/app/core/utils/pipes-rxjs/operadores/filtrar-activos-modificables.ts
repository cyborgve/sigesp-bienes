import { Activo } from '@core/models/definiciones/activo';
import { ActivoDetalleService } from '@core/services/definiciones/activo-detalle.service';
import { ActivoIntegracionService } from '@core/services/definiciones/activo-integracion.service';
import { activoModificable } from '@core/utils/funciones/activo-modificable';
import { forkJoin, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosModificables = (
  _activoDetalle: ActivoDetalleService,
  _activoIntegracion: ActivoIntegracionService
) =>
  pipe(
    switchMap((activos: Activo[]) => {
      let buscarDetalles = _activoDetalle.buscarTodos();
      let buscarIntegraciones = _activoIntegracion.buscarTodos();
      return forkJoin([buscarDetalles, buscarIntegraciones]).pipe(
        map(([detalles, integraciones]) => {
          return integraciones.filter(integracion => {
            let indiceDetalle = detalles.findIndex(
              detalle => (detalle.activoId = integracion.activoId)
            );
            let activo = {
              detalle: detalles[indiceDetalle],
              integracion: integracion,
            } as Activo;
            return activoModificable(activo);
          });
        }),
        map(integraciones =>
          integraciones.map(integracion => integracion.activoId)
        )
      );
    })
  );
