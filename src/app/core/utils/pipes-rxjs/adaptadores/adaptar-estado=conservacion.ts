import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { EstadoConservacion } from '@core/models/definiciones/estado-conservacion';

export const adaptarEstadoConservacion = () => pipe(map(adaptar));
export const adaptarEstadosConservacion = () =>
  pipe(map((estadoConservacions: any[]) => estadoConservacions.map(adaptar)));

const adaptar = (estadoConservacion: any) =>
  <EstadoConservacion>{
    empresaId: Number(estadoConservacion.empresaId),
    id: Number(estadoConservacion.id),
    codigo: estadoConservacion.codigo,
    denominacion: estadoConservacion.denominacion,
    creado: estadoConservacion.creado,
    modificado: estadoConservacion.modificado,
  };
