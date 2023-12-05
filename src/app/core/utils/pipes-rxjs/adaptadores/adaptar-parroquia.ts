import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Parroquia } from '@core/models/otros-modulos/parroquia';

export const adaptarParroquia = () => pipe(map(adaptar));
export const adaptarParroquias = () =>
  pipe(map((parroquias: any[]) => parroquias.map(adaptar)));

const adaptar = (parroquia: any) =>
  <Parroquia>{
    id: parroquia.id,
    pais: parroquia.pais,
    estado: parroquia.estado,
    municipio: parroquia.municipio,
    codigo: parroquia.codigo,
    denominacion: parroquia.denominacion,
    creado: parroquia.creado,
    modificado: parroquia.modificado,
  };
