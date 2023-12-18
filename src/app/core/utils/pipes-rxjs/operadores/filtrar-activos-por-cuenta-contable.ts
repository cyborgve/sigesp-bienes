import { of, pipe } from 'rxjs';
import { ActivoDepreciacionService } from '@core/services/definiciones/activo-depreciacion.service';
import { Id } from '@core/types/id';
import { map, switchMap } from 'rxjs/operators';
import { Activo } from '@core/models/definiciones/activo';

export const filtrarActivosPorCuentaContable = (
  cuentaContable: Id,
  _activoDepreciacion: ActivoDepreciacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      cuentaContable && cuentaContable !== 'Todos'
        ? _activoDepreciacion.buscarTodos().pipe(
            map(depreciaciones =>
              depreciaciones.filter(depreciacion => {
                let cuentaGasto =
                  depreciacion.cuentaContableDebe === cuentaContable;
                let cuentaDepreciacion =
                  depreciacion.cuentaContableHaber === cuentaContable;
                return cuentaGasto || cuentaDepreciacion;
              })
            ),
            map(depreciaciones =>
              depreciaciones.map(depreciacion => depreciacion.activoId)
            ),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
