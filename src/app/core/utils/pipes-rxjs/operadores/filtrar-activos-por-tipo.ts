import { Activo } from '@core/models/definiciones/activo';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarActivosPorTipo = (tipoActivo: string) =>
  pipe(
    map((activos: Activo[]) =>
      tipoActivo === 'TODOS'
        ? activos
        : activos.filter(activo => activo.tipoActivo === tipoActivo)
    )
  );
