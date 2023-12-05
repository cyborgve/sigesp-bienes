import { map } from 'rxjs/operators';
import { Estado } from '@core/models/otros-modulos/estado';
import { pipe } from 'rxjs';

export const adaptarEstado = () => pipe(map(adaptar));
export const adaptarEstados = () =>
  pipe(map((estados: any[]) => estados.map(adaptar)));

const adaptar = (estado: any) =>
  <Estado>{
    id: estado.id,
    codigo: estado.codigo,
    pais: estado.pais,
    capital: estado.capital,
    denominacion: estado.denominacion,
    creado: estado.creado,
    modificado: estado.modificado,
  };
