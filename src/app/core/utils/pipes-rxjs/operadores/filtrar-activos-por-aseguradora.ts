import { Activo } from '@core/models/definiciones/activo';
import { SeguroService } from '@core/services/definiciones/seguro.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorAseguradora = (
  aseguradora: Id,
  _seguro: SeguroService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      aseguradora && aseguradora !== 0
        ? _seguro.buscarTodos().pipe(
            map(seguros =>
              seguros.filter(seguro => seguro.aseguradoraId === aseguradora)
            ),
            map(seguros => seguros.map(seguro => seguro.activoId)),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
