import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Id } from '@core/types/id';
import { Activo } from '@core/models/definiciones/activo';

export const filtrarActivosPorModelo = (modelo: Id) =>
  pipe(
    map((activos: Activo[]) =>
      modelo && modelo !== 0
        ? activos.filter(activo => activo.modeloId === modelo)
        : activos
    )
  );
