import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Ciudad } from '@core/models/otros-modulos/ciudad';

export const adaptarCiudad = () => pipe(map(adaptar));
export const adaptarCiudades = () =>
  pipe(map((ciudades: any[]) => ciudades.map(adaptar)));

const adaptar = (ciudad: any) =>
  <Ciudad>{
    id: ciudad.id,
    codigo: ciudad.codigo,
    pais: ciudad.pais,
    estado: ciudad.estado,
    denominacion: ciudad.denominacion,
    creado: ciudad.creado,
    modificado: ciudad.modificado,
  };
