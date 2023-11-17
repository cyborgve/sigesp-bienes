import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { TipoComponente } from '@core/models/definiciones/tipo-componente';

export const adaptarTipoComponente = () => pipe(map(adaptar));
export const adaptarTiposComponente = () =>
  pipe(map((tipoComponentees: any[]) => tipoComponentees.map(adaptar)));

const adaptar = (tipoComponente: any) =>
  <TipoComponente>{
    empresaId: Number(tipoComponente.empresaId),
    id: Number(tipoComponente.id),
    codigo: tipoComponente.codigo,
    denominacion: tipoComponente.denominacion,
    creado: tipoComponente.creado,
    modificado: tipoComponente.modificado,
  };
