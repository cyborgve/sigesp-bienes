import { Activo } from '@core/models/definiciones/activo';
import { ActivoDetalleService } from '@core/services/definiciones/activo-detalle.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorTipoAnimal = (
  tipoAnimal: Id,
  _activoDetalle: ActivoDetalleService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      tipoAnimal && tipoAnimal !== 0
        ? _activoDetalle.buscarTodos().pipe(
            map(detalles =>
              detalles.filter(detalle => detalle.tipoAnimalId === tipoAnimal)
            ),
            map(detalles => detalles.map(detalle => detalle.activoId)),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
