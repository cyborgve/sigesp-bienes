import { switchMap, map, tap } from 'rxjs/operators';
import { pipe, forkJoin } from 'rxjs';
import { ActivoComponenteService } from '@core/services/definiciones/activo-componente.service';
import { Modificacion } from '@core/models/procesos/modificacion';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { calcularDepreciacion } from '@core/utils/funciones/depreciacion';
import { ActivoService } from '@core/services/definiciones/activo.service';

export const reversarModificacion = (
  _activoComponente: ActivoComponenteService,
  _depreciacion: DepreciacionService,
  _activo: ActivoService
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
    }),
    switchMap(modificacion => {
      let buscarActivo = _activo.buscarPorId(modificacion.activo);
      let busarDepreciacion = _depreciacion.buscarPorActivo(
        modificacion.activo
      );
      return forkJoin([buscarActivo, busarDepreciacion]).pipe(
        switchMap(([activoGuardado, depreciacionGardada]) => {
          let nuevaDepreciacion = calcularDepreciacion(
            activoGuardado.valorAdquisicion,
            activoGuardado.fechaAdquisicion,
            activoGuardado.depreciacion.vidaUtil,
            activoGuardado.depreciacion.unidadVidaUtil,
            activoGuardado.depreciacion.valorRescate,
            activoGuardado.depreciacion.metodoDepreciacion
          );
          depreciacionGardada.depreciacionAnual = nuevaDepreciacion.anual;
          depreciacionGardada.depreciacionMensual = nuevaDepreciacion.mensual;
          depreciacionGardada.detalles = nuevaDepreciacion.detalles;
          return _depreciacion
            .actualizar(
              depreciacionGardada.id,
              depreciacionGardada,
              undefined,
              false
            )
            .pipe(map(() => modificacion));
        })
      );
    })
  );
