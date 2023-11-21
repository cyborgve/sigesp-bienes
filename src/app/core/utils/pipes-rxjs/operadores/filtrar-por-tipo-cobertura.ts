import { of, pipe } from 'rxjs';
import { SeguroService } from '@core/services/definiciones/seguro.service';
import { Id } from '@core/types/id';
import { map, switchMap } from 'rxjs/operators';
import { Activo } from '@core/models/definiciones/activo';

export const filtrarActivosPorTipoCobertura = (
  tipoCobertura: Id,
  _seguro: SeguroService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      tipoCobertura && tipoCobertura !== 0
        ? _seguro.buscarTodos().pipe(
            map(seguros =>
              seguros.filter(seguro => seguro.tipoCoberturaId === tipoCobertura)
            ),
            map(seguros => seguros.map(seguro => seguro.activoId)),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
