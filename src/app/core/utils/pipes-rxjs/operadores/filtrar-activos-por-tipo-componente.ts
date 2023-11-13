import { Activo } from '@core/models/definiciones/activo';
import { ActivoComponenteService } from '@core/services/definiciones/activo-componente.service';
import { Id } from '@core/types/id';
import { of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const filtrarActivosPorTipoComponente = (
  tipoComponente: Id,
  _activoComponente: ActivoComponenteService
) =>
  pipe(
    switchMap((activos: Activo[]) =>
      tipoComponente && tipoComponente !== 0
        ? _activoComponente.buscarTodos().pipe(
            map(componentes =>
              componentes.filter(
                componente => componente.tipoComponenteId === tipoComponente
              )
            ),
            map(componentes =>
              componentes.filter(componente => componente.activoId)
            ),
            map(componentes =>
              componentes.map(componente => componente.activoId)
            ),
            map(ids => activos.filter(activo => ids.includes(activo.id)))
          )
        : of(activos)
    )
  );
