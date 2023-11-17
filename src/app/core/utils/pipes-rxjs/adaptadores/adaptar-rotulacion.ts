import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Rotulacion } from '@core/models/definiciones/rotulacion';

export const adaptarRotulacion = () => pipe(map(adaptar));
export const adaptarRotulaciones = () =>
  pipe(map((rotulaciones: any[]) => rotulaciones.map(adaptar)));

const adaptar = (rotulacion: any) =>
  <Rotulacion>{
    empresaId: Number(rotulacion.empresaId),
    id: Number(rotulacion.id),
    codigo: rotulacion.codigo,
    denominacion: rotulacion.denominacion,
    creado: rotulacion.creado,
    modificado: rotulacion.modificado,
  };
