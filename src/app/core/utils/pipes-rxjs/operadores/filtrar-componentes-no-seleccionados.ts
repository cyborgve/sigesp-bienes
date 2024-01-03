import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const filtrarComponentesNoSeleccionados = (
  componentesSeleccionados: ComponenteProceso[]
) =>
  pipe(
    map((componentes: ActivoComponente[]) => {
      let ids = componentesSeleccionados.map(cs => cs.componente);
      return componentes.filter(componente => !ids.includes(componente.id));
    })
  );
