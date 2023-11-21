import { Activo } from '@core/models/definiciones/activo';
import { ActivoDepreciacionService } from '@core/services/definiciones/activo-depreciacion.service';
import { pipe, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorMetodoDepreciacion = (
  metodoDepreciacion: string,
  _activoDepreciacion: ActivoDepreciacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      metodoDepreciacion && metodoDepreciacion !== 'TODOS'
        ? _activoDepreciacion.buscarTodos().pipe(
            map(depreciaciones =>
              depreciaciones.filter(
                depreciacion =>
                  depreciacion.metodoDepreciacion === metodoDepreciacion
              )
            ),
            map(activosDepreciacion =>
              activosDepreciacion.map(activo => activo.activoId)
            ),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
