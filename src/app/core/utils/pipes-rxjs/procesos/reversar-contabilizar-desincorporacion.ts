import { TIPOS_PROCEDE } from '@core/constants/tipos-procede';
import { AsientoContable } from '@core/models/auxiliares/asiento-contable';
import { ComprobanteContable } from '@core/models/auxiliares/comprobante-contable';
import { Integracion } from '@core/models/procesos/integracion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { DesincorporacionService } from '@core/services/procesos/desincorporacion.service';
import { Id } from '@core/types/id';
import moment from 'moment';
import { forkJoin, from, pipe } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';

export const reversarContabilizarDesincorporaciones = (
  lineaEmpresa: Id,
  fechaIntegraciones: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _desincorporacion: DesincorporacionService,
  _contabilizacion: ContabilizacionService
) =>
  pipe(
    switchMap((integraciones: Integracion[]) => {
      let desincorporaciones = integraciones
        .filter(inte => inte.tipoProceso === 'DESINCORPORACIÓN')
        .filter(integracion => integracion.aprobado === 1)
        .filter(integracion => integracion.integrado === 0);
      let convertirDesincorporaciones = from(desincorporaciones).pipe(
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
          return _contabilizacion.reversarContabilizacion(comprobantes).pipe(
            tap(res => {
              //aqui se puede realizar una accion con la respuesta de contabilidad.
              console.log(res);
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
      return _desincorporacion.buscarPorActivo(activoId).pipe(
        switchMap(desincorporacionEncontrada => {
          let buscarActivos = desincorporacionEncontrada.activos.map(
            activoProceso => _activo.buscarPorId(activoProceso.activo)
          );
          return forkJoin(buscarActivos).pipe(
            switchMap(activosEncontrados => {
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
                  let { tipoProceso, aprobado } = integracion;
                  let procede = TIPOS_PROCEDE[tipoProceso];
                  let descripcion = `DESINCORPORACIÓN: ${observaciones}`;
                  let comprobante = integracion.comprobante.split(',')[0];
                  let fechaCreado =
                    moment(fechaIntegracion).format('YYYY-MM-DD');
                  let asientosContables =
                    desincorporacionEncontrada.cuentasContables.map(
                      (cuentaContable, indice) =>
                        <AsientoContable>{
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
                    unidadAdministrativa: '---',
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
