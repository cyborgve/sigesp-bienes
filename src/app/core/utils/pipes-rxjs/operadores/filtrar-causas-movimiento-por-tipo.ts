import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { TipoCausaMovimiento } from '@core/types/tipo-causa-movimiento';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarCausasMovimientoPorTipo = (
  tipoCausaMovimiento: TipoCausaMovimiento
) =>
  pipe(
    map((causasMovimiento: CausaMovimiento[]) =>
      causasMovimiento.filter(
        causaMovimiento =>
          causaMovimiento.tipo === tipoCausaMovimiento.substring(0, 1)
      )
    )
  );
