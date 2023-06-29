import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const filtrarValoresIniciales = () =>
  pipe(
    map((entidades: any[]) => entidades.filter(entidad => entidad.id !== '0'))
  );

export const ordenarPorCodigo = () =>
  pipe(
    map((entidades: any[]) =>
      entidades.sort((a, b) => (a.codigo > b.codigo ? 1 : -1))
    )
  );

export const ordenarPorId = () =>
  pipe(
    map((entidades: any[]) => entidades.sort((a, b) => (a.id > b.id ? 1 : -1)))
  );
