import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

export const ordenarPorId = () =>
  pipe(
    map((entidades: any[]) => entidades.sort((a, b) => (a.id > b.id ? 1 : -1)))
  );
