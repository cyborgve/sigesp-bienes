import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { Retorno } from '@core/models/procesos/retorno';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { AutorizacionSalidaService } from '@core/services/procesos/autorizacion-salida.service';
import { TipoProceso } from '@core/types/tipo-proceso';
import { Observable, forkJoin, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const ejecutarRetorno = (
  _activoUbicacion: ActivoUbicacionService,
  _actaPrestamo: ActaPrestamoService,
  _autorizacionSalida: AutorizacionSalidaService
) =>
  pipe(
    switchMap((retorno: Retorno) => {
      let buscarUbicaciones = retorno.activos.map(activoProceso =>
        _activoUbicacion.buscarPorActivo(activoProceso.activo)
      );
      return forkJoin(buscarUbicaciones).pipe(
        switchMap(ubicaciones => {
          let { referenciaEstado } = ubicaciones[0];
          let tipoProceso = referenciaEstado.split('-')[0] as TipoProceso;
          let proceso = referenciaEstado.split(',')[1];
          let buscarDocumentoRelacionado =
            tipoProceso === 'ACTA DE PRÉSTAMO'
              ? _actaPrestamo.buscarPorId(Number(proceso))
              : _autorizacionSalida.buscarPorId(Number(proceso));
          return (
            buscarDocumentoRelacionado as Observable<
              ActaPrestamo | AutorizacionSalida
            >
          ).pipe(
            switchMap(documentoRelacionado => {
              let actulizarUbicaciones = ubicaciones
                .map(ubicacion => {
                  ubicacion.referenciaEstado = null;
                  if (tipoProceso === 'ACTA DE PRÉSTAMO') {
                    let {
                      unidadAdministrativaCedente,
                      unidadCedenteResponsable,
                    } = documentoRelacionado as ActaPrestamo;
                    ubicacion.unidadAdministrativaId =
                      unidadAdministrativaCedente;
                    ubicacion.responsableId = unidadCedenteResponsable;
                  }
                  return ubicacion;
                })
                .map(ubicacion =>
                  _activoUbicacion.actualizar(
                    ubicacion.id,
                    ubicacion,
                    undefined,
                    false
                  )
                );
              return forkJoin(actulizarUbicaciones).pipe(map(() => retorno));
            })
          );
        })
      );
    })
  );
