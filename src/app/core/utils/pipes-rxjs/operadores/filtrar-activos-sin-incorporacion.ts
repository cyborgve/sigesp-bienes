import { Activo } from '@core/models/definiciones/activo';
import { IncorporacionActivoService } from '@core/services/procesos/incorporacion-activo.service';
import { pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosSinIncorporacion = (
  _incorporacionActivo: IncorporacionActivoService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      _incorporacionActivo.buscarTodos().pipe(
        map(activosProceso =>
          activosProceso.map(activoProceso => activoProceso.activo)
        ),
        map(ids => activos.filter(activo => !ids.some(id => id === activo.id)))
      )
    )
  );
