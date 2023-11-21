import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { TipoUso } from '@core/models/definiciones/tipo-uso';

export const adaptarTipoUso = () => pipe(map(adaptar));
export const adaptarTiposUso = () =>
  pipe(map((tiposUso: any[]) => tiposUso.map(adaptar)));

const adaptar = (tipoUso: any) =>
  <TipoUso>{
    empresaId: Number(tipoUso.empresaId),
    id: Number(tipoUso.id),
    codigo: tipoUso.codigo,
    denominacion: tipoUso.denominacion,
    creado: tipoUso.creado,
    modificado: tipoUso.modificado,
  };
