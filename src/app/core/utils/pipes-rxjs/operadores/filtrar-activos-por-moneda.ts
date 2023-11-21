import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
import { Id } from '@core/types/id';
export const filtrarActivosPorMoneda = (moneda: Id) =>
  pipe(
    map((activos: Activo[]) =>
      moneda && moneda !== '0'
        ? activos.filter(activo => activo.monedaId === moneda)
        : activos
    )
  );
