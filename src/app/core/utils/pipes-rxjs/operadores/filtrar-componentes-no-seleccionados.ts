import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const filtrarComponentesNoSeleccionados = (
  componentesSeleccionados: ComponenteProceso[]
) =>
  pipe(
    map((componentesProceso: ComponenteProceso[]) =>
      componentesProceso.filter(
        componente => !componentesSeleccionados.includes(componente)
      )
    )
  );
