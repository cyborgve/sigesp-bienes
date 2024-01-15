import { convertirActivoRetornoEnActivoProcesoRetorno } from './../../funciones/convertir-activo-retorno-activo-proceso-retorno';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { Retorno } from '@core/models/procesos/retorno';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { AutorizacionSalidaService } from '@core/services/procesos/autorizacion-salida.service';
import { forkJoin, from, pipe } from 'rxjs';
import { groupBy, mergeMap, toArray, switchMap, map } from 'rxjs/operators';
import { TipoProceso } from '@core/types/tipo-proceso';

export const generarRetornos = (
  observaciones: string,
  _actaPrestamo: ActaPrestamoService,
  _autorizacionSalida: AutorizacionSalidaService
) =>
  pipe(
    mergeMap((activosListaRetorno: ActivoListaRetorno[]) =>
      from(activosListaRetorno).pipe(
        groupBy(alr => alr.autorizadoResponsable),
        mergeMap(grupo$ => grupo$.pipe(toArray())),
        toArray(),
        switchMap((activosListasRetorno: ActivoListaRetorno[][]) => {
          let buscarOrigenes = activosListasRetorno
            .filter(lista => lista && lista.length > 0)
            .map(grupo => {
              let primerItem = grupo[0];
              let procesoId = Number(String(primerItem.proceso).split(',')[1]);
              return primerItem.tipoProceso === 'ACTA DE PRÉSTAMO'
                ? _actaPrestamo.buscarPorId(procesoId)
                : _autorizacionSalida.buscarPorId(procesoId);
            });
          return forkJoin(buscarOrigenes).pipe(
            map(origenes => {
              let retornos: Retorno[] = [];
              origenes.forEach(origen => {
                let tipoProceso: TipoProceso =
                  'explicacion' in origen
                    ? 'AUTORIZACIÓN DE SALIDA'
                    : 'ACTA DE PRÉSTAMO';
                let indiceActivos = activosListasRetorno.findIndex(
                  activosLista =>
                    activosLista[0].tipoProceso === tipoProceso &&
                    String(activosLista[0].proceso).split(',')[0] ===
                      String(origen.comprobante).substring(5)
                );
                retornos.push({
                  empresaId: 0,
                  id: 0,
                  comprobante: '0000-00000000',
                  beneficiario:
                    'explicacion' in origen
                      ? (origen as AutorizacionSalida).empresaAutorizada
                      : (origen as ActaPrestamo).unidadReceptoraResponsable,
                  tipoComprobante: tipoProceso,
                  observaciones: observaciones,
                  activos: activosListasRetorno[indiceActivos].map(
                    convertirActivoRetornoEnActivoProcesoRetorno
                  ),
                  creado: new Date(),
                  modificado: new Date(),
                });
              });
              return retornos;
            })
          );
        })
      )
    )
  );
