import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';

export const filtrarDepreciacionesAnuales = () =>
  pipe(
    map((detallesDepreciacion: DetalleDepreciacion[]) =>
      detallesDepreciacion.filter(
        detalle => (detallesDepreciacion.indexOf(detalle) + 1) % 12 === 0
      )
    )
  );
