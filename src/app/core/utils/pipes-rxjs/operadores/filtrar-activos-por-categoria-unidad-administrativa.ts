import { Activo } from '@core/models/definiciones/activo';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorCategoriaUnidadAdministrativa = (
  categoriaUnidadAdministrativa: Id,
  _unidadAdministrativa: UnidadAdministrativaService,
  _activoUbicacion: ActivoUbicacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      categoriaUnidadAdministrativa && categoriaUnidadAdministrativa !== 0
        ? _unidadAdministrativa.buscarTodos().pipe(
            map(unidadesAdministrativas =>
              unidadesAdministrativas.filter(
                unidadAdministrativa =>
                  unidadAdministrativa.categoria ===
                  categoriaUnidadAdministrativa
              )
            ),
            map(unidadesAdministrativas =>
              unidadesAdministrativas.map(
                unidadAdministrativa => unidadAdministrativa.id
              )
            ),
            switchMap(unidadesId =>
              _activoUbicacion.buscarTodos().pipe(
                map(ubicaciones =>
                  ubicaciones.filter(ubicacion =>
                    unidadesId.includes(ubicacion.unidadAdministrativaId)
                  )
                ),
                map(ubicaciones =>
                  ubicaciones.map(ubicacion => ubicacion.activoId)
                ),
                map(activosUbicaciones =>
                  activos.filter(activo =>
                    activosUbicaciones.includes(activo.id)
                  )
                )
              )
            )
          )
        : of(activos)
    )
  );
