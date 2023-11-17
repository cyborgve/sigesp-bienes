import { switchMap, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { Activo } from '@core/models/definiciones/activo';

export const filtrarActivosSinDepreciacion = (
  _depreciacion: DepreciacionService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      _depreciacion.buscarTodos().pipe(
        map(depreciaciones =>
          depreciaciones.map(depreciacion => depreciacion.activo)
        ),
        map(ids => activos.filter(activo => !ids.includes(activo.id)))
      )
    )
  );
