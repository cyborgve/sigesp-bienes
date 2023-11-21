import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { TipoAnimal } from '@core/models/definiciones/tipo-animal';

export const adaptarTipoAnimal = () => pipe(map(adaptar));
export const adaptarTiposAnimal = () =>
  pipe(map((tipoAnimales: any[]) => tipoAnimales.map(adaptar)));

const adaptar = (tipoAnimal: any) =>
  <TipoAnimal>{
    empresaId: Number(tipoAnimal.empresaId),
    id: Number(tipoAnimal.id),
    codigo: tipoAnimal.codigo,
    denominacion: tipoAnimal.denominacion,
    creado: tipoAnimal.creado,
    modificado: tipoAnimal.modificado,
  };
