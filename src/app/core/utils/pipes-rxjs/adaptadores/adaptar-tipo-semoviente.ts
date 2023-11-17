import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { TipoSemoviente } from '@core/models/definiciones/tipo-semoviente';

export const adaptarTipoSemoviente = () => pipe(map(adaptar));
export const adaptarTiposSemoviente = () =>
  pipe(map((tiposSemoviente: any[]) => tiposSemoviente.map(adaptar)));

const adaptar = (tipoSemoviente: any) =>
  <TipoSemoviente>{
    empresaId: Number(tipoSemoviente.empresaId),
    id: Number(tipoSemoviente.id),
    codigo: tipoSemoviente.codigo,
    denominacion: tipoSemoviente.denominacion,
    creado: tipoSemoviente.creado,
    modificado: tipoSemoviente.modificado,
  };
