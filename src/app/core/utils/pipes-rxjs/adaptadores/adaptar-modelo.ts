import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Modelo } from '@core/models/definiciones/modelo';

export const adaptarModelo = () => pipe(map(adaptar));
export const adaptarModelos = () =>
  pipe(map((modelos: any[]) => modelos.map(adaptar)));

const adaptar = (modelo: any) =>
  <Modelo>{
    empresaId: Number(modelo.empresaId),
    id: Number(modelo.id),
    codigo: modelo.codigo,
    denominacion: modelo.denominacion,
    marcaId: Number(modelo.marcaId),
    creado: modelo.creado,
    modificado: modelo.modificado,
  };
