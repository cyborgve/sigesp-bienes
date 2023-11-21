import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { EstadoUso } from '@core/models/definiciones/estado-uso';

export const adaptarEstadoUso = () => pipe(map(adaptar));
export const adaptarEstadosUso = () =>
  pipe(map((estadoUsos: any[]) => estadoUsos.map(adaptar)));

const adaptar = (estadoUso: any) =>
  <EstadoUso>{
    empresaId: Number(estadoUso.empresaId),
    id: Number(estadoUso.id),
    codigo: estadoUso.codigo,
    denominacion: estadoUso.denominacion,
    creado: estadoUso.creado,
    modificado: estadoUso.modificado,
  };
