import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { switchMap, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';

export const ejecutarEntregaUnidad = (
  _unidadAdministrativa: UnidadAdministrativaService
) =>
  pipe(
    switchMap((entregaUnidad: EntregaUnidad) => {
      return _unidadAdministrativa
        .buscarPorId(entregaUnidad.unidadAdministrativa)
        .pipe(
          switchMap(unidadAdministrativa => {
            unidadAdministrativa.responsable = entregaUnidad.nuevoResponsable;
            return _unidadAdministrativa
              .actualizar(
                unidadAdministrativa.id,
                unidadAdministrativa,
                undefined,
                false
              )
              .pipe(map(() => entregaUnidad));
          })
        );
    })
  );
