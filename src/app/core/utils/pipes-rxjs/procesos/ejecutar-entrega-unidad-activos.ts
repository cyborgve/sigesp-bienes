import { switchMap, map } from 'rxjs/operators';
import { pipe, forkJoin } from 'rxjs';
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { filtrarActivosPorUnidadAdministrativa } from '../operadores/filtrar-activos-por-unidad-administrativa';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { ActivoService } from '@core/services/definiciones/activo.service';

export const ejecutarEntregaUnidadActivos = (
  _activo: ActivoService,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((entregaUnidad: EntregaUnidad) =>
      _activo.buscarTodos().pipe(
        filtrarActivosPorUnidadAdministrativa(
          entregaUnidad.unidadAdministrativa,
          _activoUbicacion
        ),
        switchMap(activos => {
          let completarActivos = activos.map(activo =>
            _activo.buscarPorId(activo.id)
          );
          return forkJoin(completarActivos).pipe(
            switchMap(activosCompletos => {
              activosCompletos.forEach(
                activo =>
                  (activo.ubicacion.responsableId =
                    entregaUnidad.nuevoResponsable)
              );
              let actualizarActivos = activosCompletos.map(activo =>
                _activo.actualizar(activo.id, activo, 'activo')
              );
              return forkJoin(actualizarActivos).pipe(map(() => entregaUnidad));
            })
          );
        })
      )
    )
  );
