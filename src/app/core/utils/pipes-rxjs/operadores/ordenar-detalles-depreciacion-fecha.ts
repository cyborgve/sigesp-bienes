import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

export const ordenarDetallesDepreciacionPorFecha = () =>
  pipe(
    map((detallesDepreciacion: DetalleDepreciacion[]) =>
      detallesDepreciacion.sort((a, b) => (a.fecha > b.fecha ? 1 : -1))
    )
  );
