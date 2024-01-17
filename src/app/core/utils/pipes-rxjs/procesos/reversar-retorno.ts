import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { Retorno } from '@core/models/procesos/retorno';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { AutorizacionSalidaService } from '@core/services/procesos/autorizacion-salida.service';
import { forkJoin, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const reversarRetorno = (
  _activoUbicacion: ActivoUbicacionService,
  _actaPrestamo: ActaPrestamoService,
  _autorizacionSalida: AutorizacionSalidaService
) =>
  pipe(
    switchMap((retorno: Retorno) => {
      let buscarUbicaciones = retorno.activos.map(activoProcesoRetorno =>
        _activoUbicacion.buscarPorActivo(activoProcesoRetorno.activo)
      );
      let buscarDocumentosRelacionados = retorno.activos.map(
        activoProcesoRetorno =>
          activoProcesoRetorno.documentoRelacionado.substring(0, 3) === 'ACT'
            ? _actaPrestamo.buscarPorId(
                Number(activoProcesoRetorno.documentoRelacionado.split(',')[1])
              )
            : _autorizacionSalida.buscarPorId(
                Number(activoProcesoRetorno.documentoRelacionado.split(',')[1])
              )
      );
      return forkJoin([
        ...buscarUbicaciones,
        ...buscarDocumentosRelacionados,
      ]).pipe(
        switchMap((ubicacionesDocs, indice) => {
          let ubicaciones = ubicacionesDocs.splice(
            0,
            buscarUbicaciones.length
          ) as ActivoUbicacion[];
          let documentosRelacionados = ubicacionesDocs.splice(
            buscarUbicaciones.length
          );

          let actualizarUbicaciones = ubicaciones.map(ubicacion => {
            if (
              retorno.activos[0].documentoRelacionado.substring(0, 3) === 'ACT'
            ) {
              let {
                unidadAdministrativaReceptora,
                unidadReceptoraResponsable,
                comprobante,
                id,
              } = documentosRelacionados[indice] as ActaPrestamo;
              ubicacion.unidadAdministrativaId = unidadAdministrativaReceptora;
              ubicacion.responsableId = unidadReceptoraResponsable;
              ubicacion.referenciaEstado =
                'ACTA DE PRÉSTAMO-' + comprobante + ',' + id;
            } else {
              let { comprobante, id } = documentosRelacionados[
                indice
              ] as AutorizacionSalida;
              ubicacion.referenciaEstado =
                'AUTORIZACIÓN DE SALIDA-' + comprobante + ',' + id;
            }
          });
          return forkJoin(actualizarUbicaciones).pipe(map(() => retorno));
        })
      );
    })
  );
