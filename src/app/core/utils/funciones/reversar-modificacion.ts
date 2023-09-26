import { switchMap, map } from 'rxjs/operators';
import { pipe, forkJoin } from 'rxjs';
import { ActivoComponenteService } from '@core/services/definiciones/activo-componente.service';
import { Modificacion } from '@core/models/procesos/modificacion';

export const reversarModificacion = (
  _activoComponente: ActivoComponenteService
) =>
  pipe(
    switchMap((modificacion: Modificacion) => {
      let buscarComponentes = modificacion.modificaciones.map(
        componenteProceso =>
          _activoComponente.buscarPorId(componenteProceso.componente).pipe(
            map(componente => {
              componente.activoId = 0;
              return componente;
            })
          )
      );
      return forkJoin(buscarComponentes).pipe(
        switchMap(componentes => {
          let asignarComponentes = componentes.map(componente =>
            _activoComponente.actualizar(
              componente.id,
              componente,
              undefined,
              false
            )
          );
          return forkJoin(asignarComponentes).pipe(map(() => modificacion));
        })
      );
    })
  );
