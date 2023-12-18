import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Clase } from '@core/models/definiciones/clase';

export const adaptarClase = () => pipe(map(adaptar));
export const adaptarClases = () =>
  pipe(map((clases: any[]) => clases.map(adaptar)));

const adaptar = (clase: any) =>
  <Clase>{
    empresaId: Number(clase.empresaId),
    id: Number(clase.id),
    codigo: clase.codigo,
    denominacion: clase.denominacion,
    creado: clase.creado,
    modificado: clase.modificado,
  };
