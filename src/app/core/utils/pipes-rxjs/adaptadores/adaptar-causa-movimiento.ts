import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';

export const adaptarCausaMovimiento = () => pipe(map(adaptar));
export const adaptarCausasMovimiento = () =>
  pipe(map((causasMovimiento: any[]) => causasMovimiento.map(adaptar)));

const adaptar = (causaMovimiento: any) =>
  <CausaMovimiento>{
    empresaId: Number(causaMovimiento.empresaId),
    id: Number(causaMovimiento.id),
    codigo: causaMovimiento.codigo,
    denominacion: causaMovimiento.denominacion,
    tipo: causaMovimiento.tipo,
    estAfectacionContable: Number(causaMovimiento.estAfectacionContable),
    estAfectacionPresupuestaria: Number(
      causaMovimiento.estAfectacionPresupuestaria
    ),
    creado: causaMovimiento.creado,
    modificado: causaMovimiento.modificado,
  };
