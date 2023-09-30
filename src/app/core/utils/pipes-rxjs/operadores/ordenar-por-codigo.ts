import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
export const ordenarPorCodigo = () =>
  pipe(
    map((entidades: any[]) =>
      entidades.sort((a, b) => (a.codigo < b.codigo ? -1 : 1))
    )
  );
