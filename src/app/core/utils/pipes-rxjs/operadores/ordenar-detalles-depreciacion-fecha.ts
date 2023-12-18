import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';

export const ordenarActivoListaDepreciacionPorFecha = () =>
  pipe(
    map((activosListaDepreciacion: ActivoListaDepreciacion[]) =>
      activosListaDepreciacion.sort((a, b) =>
        a.fechaDepreciacion > b.fechaDepreciacion ? 1 : -1
      )
    )
  );
