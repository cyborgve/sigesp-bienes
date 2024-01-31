import { MatSnackBar } from '@angular/material/snack-bar';
import { TIPOS_PROCEDE } from '@core/constants/tipos-procede';
import { AsientoContable } from '@core/models/auxiliares/asiento-contable';
import { ComprobanteContable } from '@core/models/auxiliares/comprobante-contable';
import { Integracion } from '@core/models/procesos/integracion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { DesincorporacionService } from '@core/services/procesos/desincorporacion.service';
import { IntegracionService } from '@core/services/procesos/integracion.service';
import { Id } from '@core/types/id';
import moment from 'moment';
import { forkJoin, from, of, pipe } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';

export const reversarContabilizarDesincorporaciones = (
  lineaEmpresa: Id,
  fechaIntegraciones: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _desincorporacion: DesincorporacionService,
  _contabilizacion: ContabilizacionService,
  _integracion: IntegracionService,
  _snackBar: MatSnackBar,
  notificar: boolean
) =>
  pipe(
    switchMap((integraciones: Integracion[]) => {
      let convertirDesincorporaciones = from(
        integracionesCandidatas(integraciones)
      ).pipe(
        generarComprobanteContableDesincirporacion(
          lineaEmpresa,
          fechaIntegraciones,
          observaciones,
          _activo,
          _unidadAdministrativa,
          _desincorporacion
        )
      );
      return convertirDesincorporaciones.pipe(
        toArray(),
        switchMap(comprobantes => {
          return _contabilizacion.reversarContabilizar(comprobantes).pipe(
            tap(resultado => {
              if (resultado.data.length > 0) {
                if (notificar) {
                  let { data } = resultado;
                  let exitosas = data.filter(dato => dato.estatus);
                  let fallidas = data.filter(dato => !dato.estatus);
                  let mensaje = `De ${data.length} desincorporaciones enviadas, ${exitosas.length} 
                  se contabilizaron con exito y ${fallidas.length} fallaron`;
                  _snackBar.open(mensaje, undefined, {
                    duration: 8000,
                  });
                }
              }
            }),
            switchMap(resultado => {
              let exitosas = resultado.data.filter(
                comprobante => comprobante.estatus
              );
              let actualizarIntegraciones = exitosas
                .map(comprobante =>
                  integraciones.find(
                    integracion =>
                      integracion.procesoComprobante === comprobante.documento
                  )
                )
                .map(integracion =>
                  _integracion.actualizar(
                    integracion.id,
                    integracion,
                    undefined,
                    false
                  )
                );
              return exitosas.length > 0
                ? forkJoin(actualizarIntegraciones).pipe(map(() => resultado))
                : of(resultado);
            }),
            map(() => integraciones)
          );
        })
      );
    })
  );

const generarComprobanteContableDesincirporacion = (
  lineaEmpresa: Id,
  fechaIntegracion: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _desincorporacion: DesincorporacionService
) =>
  pipe(
    switchMap((integracion: Integracion) => {
      let activoId =
        String(integracion.activo).split(',').length > 1
          ? Number(String(integracion.activo).split(',')[0])
          : Number(integracion.activo);
      return _desincorporacion.buscarPorActivo(Number(activoId)).pipe(
        switchMap(desincorporacionEncontrada => {
          let buscarActivos = desincorporacionEncontrada.activos.map(
            activoProceso => _activo.buscarPorId(activoProceso.activo)
          );
          return forkJoin(buscarActivos).pipe(
            switchMap((activosEncontrados, indice) => {
              let buscarUnidadesAdministrativas = activosEncontrados.map(
                activo =>
                  _unidadAdministrativa
                    .buscarPorId(activo.ubicacion.unidadAdministrativaId)
                    .pipe(
                      map(unidad => ({
                        unidadAdministrativa: unidad.unidadOrganizativa,
                        activo: activo.id,
                      }))
                    )
              );
              return forkJoin(buscarUnidadesAdministrativas).pipe(
                map(unidadesAdministrativas => {
                  let { procesoTipo, aprobado } = integracion;
                  let procede = TIPOS_PROCEDE[procesoTipo];
                  let descripcion = `DESINCORPORACIÓN: ${observaciones}`;
                  let comprobante =
                    'DES-' + integracion.procesoComprobante.split(',')[0];
                  let fechaCreado =
                    moment(fechaIntegracion).format('YYYY-MM-DD');
                  let asientosContables =
                    desincorporacionEncontrada.cuentasContables.map(
                      cuentaContable => {
                        let asiento = <AsientoContable>{
                          centroCostos:
                            activosEncontrados[indice]['detalle'][
                              'codigoCentroCostos'
                            ],
                          comprobante: comprobante,
                          creado: fechaCreado,
                          cuentaContable: cuentaContable.cuentaContable,
                          unidadOrganizativa:
                            unidadesAdministrativas[indice][
                              'unidadAdministrativa'
                            ],
                          descripcion: descripcion,
                          procedencia: cuentaContable.procedencia.charAt(0),
                          monto: cuentaContable.monto,
                        };
                        return asiento;
                      }
                    );
                  let monto = 0;
                  asientosContables
                    .filter(ac => ac.procedencia === 'D')
                    .forEach(ac => (monto += monto));
                  return <ComprobanteContable>{
                    procede: procede,
                    lineaEmpresa: lineaEmpresa,
                    centroCostos: '---',
                    fuenteFinanciamiento: 0,
                    unidadAdministrativa: 0,
                    descripcion: descripcion,
                    aprobado: aprobado,
                    monto: monto,
                    comprobante: comprobante,
                    creado: fechaCreado,
                    asientosContables: asientosContables,
                  };
                })
              );
            })
          );
        })
      );
    })
  );

const integracionesCandidatas = (integraciones: Integracion[]) =>
  integraciones
    .filter(integracion => integracion.procesoTipo === 'DESINCORPORACIÓN')
    .filter(integracion => integracion.aprobado == 1)
    .filter(integracion => integracion.integrado == 0);
