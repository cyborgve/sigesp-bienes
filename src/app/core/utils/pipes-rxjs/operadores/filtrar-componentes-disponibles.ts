import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const filtrarComponentesDisponibles = () =>
  pipe(
    map((componentes: ActivoComponente[]) =>
      componentes.filter(
        componente => componente.activoId === null || componente.activoId === 0
      )
    )
  );
