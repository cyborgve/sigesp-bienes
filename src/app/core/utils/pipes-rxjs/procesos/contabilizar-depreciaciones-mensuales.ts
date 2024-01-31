import { MatSnackBar } from '@angular/material/snack-bar';
import { TIPOS_PROCEDE } from '@core/constants/tipos-procede';
import { ComprobanteContable } from '@core/models/auxiliares/comprobante-contable';
import { ResultadoContabilidad } from '@core/models/auxiliares/resultado-contabilidad';
import { Integracion } from '@core/models/procesos/integracion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { IntegracionService } from '@core/services/procesos/integracion.service';
import { Id } from '@core/types/id';
import moment from 'moment';
import { forkJoin, from, of, pipe } from 'rxjs';
import { filter, map, switchMap, tap, toArray } from 'rxjs/operators';

export const contabilizarDepreciacionesMensuales = (
  lineaEmpresa: Id,
  fechaIntegraciones: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _depreciacion: DepreciacionService,
  _contabilizacion: ContabilizacionService,
  _integracion: IntegracionService,
  _snackBar: MatSnackBar,
  notificar: boolean
) =>
  pipe(
    filter(
      (integraciones: Integracion[]) =>
        integracionesCandidatas(integraciones).length > 0
    ),
    switchMap(integraciones => {
      let convertirDepreciaciones = from(
        integracionesCandidatas(integraciones)
      ).pipe(
        generarComprobanteContableDepreciacion(
          lineaEmpresa,
          fechaIntegraciones,
          observaciones,
          _activo,
          _unidadAdministrativa,
          _depreciacion
        )
      );
      return convertirDepreciaciones.pipe(
        toArray(),
        switchMap(comprobantes => {
          return _contabilizacion.contabilizar(comprobantes).pipe(
            tap((resultado: ResultadoContabilidad) => {
              if (resultado.data.length > 0) {
                if (notificar) {
                  let { data } = resultado;
                  let exitosas = data.filter(
                    comprobante => comprobante.estatus
                  );
                  let fallidas = data.filter(
                    comprobante => !comprobante.estatus
                  );
                  let mensaje = `De ${data.length} depreciaciones enviadas, ${exitosas.length} 
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

const generarComprobanteContableDepreciacion = (
  lineaEmpresa: Id,
  fechaIntegracion: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _depreciacion: DepreciacionService
) =>
  pipe(
    switchMap((integracion: Integracion) => {
      let activoId =
        String(integracion.activo).split(',').length > 1
          ? Number(String(integracion.activo).split(',')[0])
          : Number(integracion.activo);
      let buscarActivo = _activo.buscarPorId(activoId);
      let buscarDepreciacion = _depreciacion.buscarPorActivo(activoId);
      return forkJoin([buscarActivo, buscarDepreciacion]).pipe(
        switchMap(([activoEncontrado, depreciacionEncontrada]) =>
          _unidadAdministrativa
            .buscarPorId(activoEncontrado.ubicacion.unidadAdministrativaId)
            .pipe(
              map(unidadAdministrativaEncontada => {
                let { procesoComprobante, aprobado, procesoTipo } = integracion;
                let { codigoCentroCostos, fuenteFinanciamiento } =
                  activoEncontrado.detalle;
                let { cuentaContableDebe, cuentaContableHaber } =
                  activoEncontrado.depreciacion;
                let { unidadOrganizativa } = unidadAdministrativaEncontada;
                let descripcion = `Depreciacion: ${observaciones}`;
                let indiceDepreciacionMensual =
                  depreciacionEncontrada.detalles.findIndex(detalle => {
                    let fechadep = detalle.fecha;
                    return (
                      moment(fechaIntegracion).startOf('day').get('year') ===
                        moment(fechadep).startOf('day').get('year') &&
                      moment(fechaIntegracion).startOf('day').get('month') ===
                        moment(fechadep).startOf('day').get('month')
                    );
                  });
                let fecha = moment(fechaIntegracion).format('YYYY-MM-DD');
                let depreciacionMensual =
                  depreciacionEncontrada.detalles[indiceDepreciacionMensual];
                let comprobante = procesoComprobante;
                let comprobanteSalida = <ComprobanteContable>{
                  procede: TIPOS_PROCEDE[procesoTipo],
                  lineaEmpresa: lineaEmpresa,
                  centroCostos: codigoCentroCostos,
                  unidadAdministrativa: unidadOrganizativa,
                  fuenteFinanciamiento: fuenteFinanciamiento,
                  comprobante: comprobante,
                  monto: depreciacionMensual.depreciacionMensual,
                  aprobado: aprobado,
                  descripcion: descripcion,
                  creado: fecha,
                  asientosContables: [
                    {
                      centroCostos: codigoCentroCostos,
                      comprobante: comprobante,
                      cuentaContable: cuentaContableDebe,
                      procedencia: 'D',
                      creado: fecha,
                      descripcion: descripcion,
                      monto: depreciacionMensual.depreciacionMensual,
                      unidadOrganizativa: unidadOrganizativa,
                    },
                    {
                      centroCostos: codigoCentroCostos,
                      comprobante: comprobante,
                      cuentaContable: cuentaContableHaber,
                      procedencia: 'H',
                      monto: depreciacionMensual.depreciacionMensual,
                      descripcion: descripcion,
                      creado: fecha,
                      unidadOrganizativa: unidadOrganizativa,
                    },
                  ],
                };
                return comprobanteSalida;
              })
            )
        )
      );
    })
  );

const integracionesCandidatas = (integraciones: Integracion[]) =>
  integraciones
    .filter(integracion => integracion.procesoTipo === 'DEPRECIACIÓN MENSUAL')
    .filter(integracion => integracion.aprobado == 1)
    .filter(integracion => integracion.integrado == 1);
