import { map } from 'rxjs/operators';
import { Ciudad } from '@core/models/otros-modulos/ciudad';
import { pipe } from 'rxjs';

export const adaptarCiudad = () => pipe(map(adaptar));
export const adaptarCiudades = () =>
  pipe(map((ciudades: any[]) => ciudades.map(adaptar)));

const adaptar = (ciudad: any) =>
  <Ciudad>{
    empresaId: undefined,
    paisId: ciudad.codpai,
    estadoId: ciudad.codpai + '-' + ciudad.codest,
    id:
      ciudad.codciu === '---'
        ? ciudad.codciu
        : ciudad.codpai + '-' + ciudad.codest + '-' + ciudad.codciu,
    denominacion: ciudad.desciu,
    codigo: ciudad.codciu,
    creado: new Date(),
    modificado: new Date(),
  };
