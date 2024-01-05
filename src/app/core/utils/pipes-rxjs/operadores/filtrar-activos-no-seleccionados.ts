import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { Activo } from '@core/models/definiciones/activo';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarActivosNoSeleccionados = (
  activosSeleccionados: ActivoProceso[]
) =>
  pipe(
    map((activos: Activo[]) =>
      activos.filter(
        activo =>
          !activosSeleccionados
            .map(activoSeleccionado => activoSeleccionado.activo)
            .includes(activo.id)
      )
    )
  );
