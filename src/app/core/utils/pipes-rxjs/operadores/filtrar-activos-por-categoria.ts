import { map } from 'rxjs/operators';
import { Id } from '@core/types/id';
import { pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
export const filtrarActivosPorCategoria = (categoria: Id) =>
  pipe(
    map((activos: Activo[]) =>
      categoria && categoria !== 0
        ? activos.filter(activo => activo.categoriaId === categoria)
        : activos
    )
  );
