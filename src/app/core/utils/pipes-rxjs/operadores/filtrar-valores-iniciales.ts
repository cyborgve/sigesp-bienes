import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

export const filtrarValoresIniciales = () =>
  pipe(
    map((entidades: any[]) => entidades.filter(entidad => entidad.id !== '0')),
    map((entidades: any[]) =>
      entidades.filter(entidad => entidad.id !== '---')
    ),
    map((entidades: any[]) => entidades.filter(entidad => entidad.id !== '--')),
    map((entidades: any[]) => entidades.filter(entidad => entidad.id !== 0))
  );
