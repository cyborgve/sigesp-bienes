import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { TipoSede } from '@core/models/definiciones/tipo-sede';

export const adaptarTipoSede = () => pipe(map(adaptar));
export const adaptarTiposSede = () =>
  pipe(map((tiposSede: any[]) => tiposSede.map(adaptar)));

const adaptar = (tipoSede: any) =>
  <TipoSede>{
    empresaId: Number(tipoSede.empresaId),
    id: Number(tipoSede.id),
    codigo: tipoSede.codigo,
    denominacion: tipoSede.denominacion,
    creado: tipoSede.creado,
    modificado: tipoSede.modificado,
  };
