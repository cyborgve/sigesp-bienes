import { switchMap, map, tap } from 'rxjs/operators';
import { pipe, forkJoin } from 'rxjs';
import { ActivoComponenteService } from '@core/services/definiciones/activo-componente.service';
import { Modificacion } from '@core/models/procesos/modificacion';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { recalcularDepreciacion } from '@core/utils/funciones/recalcular-depreciacion';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';

export const ejecutarModificacion = (
  _activoComponente: ActivoComponenteService,
  _depreciacion: DepreciacionService
) =>
  pipe(
    switchMap((modificacion: Modificacion) => {
      let buscarComponentes = modificacion.modificaciones.map(
        componenteProceso =>
          _activoComponente.buscarPorId(componenteProceso.componente).pipe(
            map(componente => {
              componente.activoId = modificacion.activo;
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
    }),
    segundaParte(_depreciacion, _activoComponente)
  );

const segundaParte = (
  _depreciacion: DepreciacionService,
  _activoComponente: ActivoComponenteService
) =>
  pipe(
    switchMap((modificacion: Modificacion) => {
      let buscarDepreciacion = _depreciacion.buscarPorActivo(
        modificacion.activo
      );
      let buscarComponentes = modificacion.modificaciones.map(modificacion =>
        _activoComponente.buscarPorId(modificacion.componente)
      );
      return forkJoin([buscarDepreciacion, ...buscarComponentes]).pipe(
        map(depreciacionComponentes => {
          let valorTotalModificacion = 0;
          let depreciacionExistente =
            depreciacionComponentes[0] as Depreciacion;
          depreciacionComponentes
            .slice(1)
            .forEach(
              (componente: ActivoComponente) =>
                (valorTotalModificacion += componente.costo)
            );
          return recalcularDepreciacion(
            depreciacionExistente,
            modificacion.creado,
            valorTotalModificacion
          );
        }),
        switchMap(depreciacion =>
          _depreciacion
            .actualizar(depreciacion.id, depreciacion, undefined, false)
            .pipe(map(() => modificacion))
        )
      );
    })
  );
