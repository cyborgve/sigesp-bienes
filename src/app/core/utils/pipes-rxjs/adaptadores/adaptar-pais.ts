import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Pais } from '@core/models/otros-modulos/pais';

export const adaptarPais = () => pipe(map(adaptar));
export const adaptarPaises = () =>
  pipe(map((paises: any[]) => paises.map(adaptar)));

const adaptar = (pais: any) =>
  <Pais>{
    id: pais.id,
    codigo: pais.codigo,
    denominacion: pais.denominacion,
    creado: pais.creado,
    modificado: pais.modificado,
  };
