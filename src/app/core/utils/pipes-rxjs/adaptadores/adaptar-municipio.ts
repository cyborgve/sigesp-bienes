import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Municipio } from '@core/models/otros-modulos/municipio';

export const adaptarMunicipio = () => pipe(map(adaptar));
export const adaptarMunicipios = () =>
  pipe(map((municipios: any[]) => municipios.map(adaptar)));

const adaptar = (municipio: any) =>
  <Municipio>{
    id: municipio.id,
    codigo: municipio.codigo,
    pais: municipio.pais,
    estado: municipio.estado,
    capital: municipio.capital,
    denominacion: municipio.denominacion,
    creado: municipio.creado,
    modificado: municipio.modificado,
  };
