import { switchMap, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoDepreciacionService } from '@core/services/definiciones/activo-depreciacion.service';
import { comprobarActivoDepreciable } from '@core/utils/funciones/comprobar-activo-depreciable';
export const filtrarActivosDepreciables = (
  _activoDepreciacion: ActivoDepreciacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      _activoDepreciacion.buscarTodos().pipe(
        map(depreciaciones =>
          depreciaciones.filter((depreciacion, indice) => {
            let activo = { ...activos[indice], depreciacion } as Activo;
            return comprobarActivoDepreciable(activo);
          })
        ),
        map(depreciaciones =>
          depreciaciones.map(depreciacion => depreciacion.activoId)
        ),
        map(ids => activos.filter(activo => ids.includes(activo.id)))
      )
    )
  );
