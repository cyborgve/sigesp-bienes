import { switchMap, map } from 'rxjs/operators';
import { pipe, forkJoin } from 'rxjs';
import { ActivoComponenteService } from '@core/services/definiciones/activo-componente.service';
import { Modificacion } from '@core/models/procesos/modificacion';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { calcularDepreciacion } from '@core/utils/funciones/depreciacion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';
import { fechasSonIguales } from '@core/utils/funciones/fechas-son-iguales';

export const reversarModificacion = (
  _activoComponente: ActivoComponenteService,
  _depreciacion: DepreciacionService,
  _activo: ActivoService
) =>
  pipe(
    switchMap((modificacion: Modificacion) => {
      let buscarComponentes = modificacion.modificaciones.map(
        componenteProceso =>
          _activoComponente.buscarPorId(componenteProceso.componente)
      );
      return forkJoin(buscarComponentes).pipe(
        switchMap(componentesEncontrados => {
          let desasignarComponentes = componentesEncontrados
            .map(componente => {
              componente.activoId = 0;
              return componente;
            })
            .map(componente =>
              _activoComponente.actualizar(
                componente.id,
                componente,
                undefined,
                false
              )
            );
          return forkJoin(desasignarComponentes).pipe(map(() => modificacion));
        })
      );
    }),
    switchMap(modificacion => {
      let buscarActivo = _activo.buscarPorId(modificacion.activo);
      let busarDepreciacion = _depreciacion.buscarPorActivo(
        modificacion.activo
      );
      return forkJoin([buscarActivo, busarDepreciacion]).pipe(
        switchMap(([activoGuardado, depreciacionGuardada]) => {
          let { valorAdquisicion, fechaAdquisicion } = activoGuardado;
          let { vidaUtil, unidadVidaUtil, valorRescate, metodoDepreciacion } =
            activoGuardado.depreciacion;
          let nuevaDepreciacion = calcularDepreciacion(
            valorAdquisicion,
            fechaAdquisicion,
            vidaUtil,
            unidadVidaUtil,
            valorRescate,
            normalizarMetodoDepreciacion(metodoDepreciacion)
          );
          depreciacionGuardada.depreciacionAnual = nuevaDepreciacion.anual;
          depreciacionGuardada.depreciacionMensual = nuevaDepreciacion.mensual;
          depreciacionGuardada.detalles = nuevaDepreciacion.detalles.map(
            detalle => {
              let detalleGuardado = depreciacionGuardada.detalles.find(
                detalleDepreciacion =>
                  fechasSonIguales(detalleDepreciacion.fecha, detalle.fecha)
              );
              detalle.empresaId = detalleGuardado.empresaId;
              detalle.id = detalleGuardado.id;
              return detalle;
            }
          );
          return _depreciacion
            .actualizar(
              depreciacionGuardada.id,
              depreciacionGuardada,
              undefined,
              false
            )
            .pipe(map(() => modificacion));
        })
      );
    })
  );
