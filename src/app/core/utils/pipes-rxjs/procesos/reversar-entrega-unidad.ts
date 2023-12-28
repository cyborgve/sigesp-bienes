import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { forkJoin, pipe } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';

export const reversarEntregaUnidad = (
  entregaUnidad: EntregaUnidad,
  _unidadAdministrativa: UnidadAdministrativaService,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    filter((eliminado: boolean) => eliminado),
    switchMap(() => {
      let buscarUnidadAdministrativa = _unidadAdministrativa
        .buscarPorId(entregaUnidad.unidadAdministrativa)
        .pipe(
          map(unidadAdministrativa => {
            unidadAdministrativa.responsable =
              entregaUnidad.responsableAnterior;
            return unidadAdministrativa;
          })
        );
      let buscarUbicacionActivos = entregaUnidad.activos.map(activoProceso =>
        _activoUbicacion.buscarPorId(activoProceso.activo).pipe(
          map(ubicacion => {
            ubicacion.responsableId = entregaUnidad.responsableAnterior;
            return ubicacion;
          })
        )
      );
      return forkJoin([
        buscarUnidadAdministrativa,
        ...buscarUbicacionActivos,
      ]).pipe(
        switchMap(encontrados => {
          let unidadAdministrativa = encontrados[0] as UnidadAdministrativa;
          let activosUbicacion = encontrados.slice(1) as ActivoUbicacion[];
          let actualizarUnidadAdministrativa = _unidadAdministrativa.actualizar(
            unidadAdministrativa.id,
            unidadAdministrativa,
            undefined,
            false
          );
          return forkJoin([
            actualizarUnidadAdministrativa,
            ...activosUbicacion,
          ]);
        })
      );
    })
  );
