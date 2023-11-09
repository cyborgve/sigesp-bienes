import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
import { Id } from '@core/types/id';

export const filtrarActivosPorColor = (color: Id) =>
  pipe(
    map((activos: Activo[]) =>
      color && color !== 0
        ? activos.filter(activo => activo.colorId === color)
        : activos
    )
  );
