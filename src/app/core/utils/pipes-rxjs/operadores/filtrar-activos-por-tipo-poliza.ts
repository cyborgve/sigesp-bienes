import { of, pipe } from 'rxjs';
import { SeguroService } from '@core/services/definiciones/seguro.service';
import { Id } from '@core/types/id';
import { map, switchMap } from 'rxjs/operators';
import { Activo } from '@core/models/definiciones/activo';

export const filtrarActivosPorTipoPoliza = (
  tipoPoliza: Id,
  _seguro: SeguroService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      tipoPoliza && tipoPoliza !== 0
        ? _seguro.buscarTodos().pipe(
            map(seguros =>
              seguros.filter(seguro => seguro.tipoPolizaId === tipoPoliza)
            ),
            map(seguros => seguros.map(seguro => seguro.activoId)),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
