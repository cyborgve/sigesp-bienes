import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Raza } from '@core/models/definiciones/raza';

export const adaptarRaza = () => pipe(map(adaptar));
export const adaptarRazas = () =>
  pipe(map((razas: any[]) => razas.map(adaptar)));

const adaptar = (raza: any) =>
  <Raza>{
    empresaId: Number(raza.empresaId),
    id: Number(raza.id),
    tipoAnimalId: Number(raza.tipoAnimalId),
    codigo: raza.codigo,
    denominacion: raza.denominacion,
    creado: raza.creado,
    modificado: raza.modificado,
  };
