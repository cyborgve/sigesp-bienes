import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Color } from '@core/models/definiciones/color';

export const adaptarColor = () => pipe(map(adaptar));
export const adaptarColores = () =>
  pipe(map((colores: any[]) => colores.map(adaptar)));

const adaptar = (color: any) =>
  <Color>{
    empresaId: Number(color.empresaId),
    id: Number(color.id),
    codigo: color.codigo,
    denominacion: color.denominacion,
    creado: color.creado,
    modificado: color.modificado,
  };
