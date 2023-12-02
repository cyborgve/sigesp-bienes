import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';

export const filtrarDepreciacionesAnuales = () =>
  pipe(
    map((activoListaDepreciacion: ActivoListaDepreciacion[]) =>
      activoListaDepreciacion.filter(
        detalle => (activoListaDepreciacion.indexOf(detalle) + 1) % 12 === 0
      )
    )
  );
