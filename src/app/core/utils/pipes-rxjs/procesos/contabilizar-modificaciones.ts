import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { TIPOS_PROCEDE } from '@core/constants/tipos-procede';
import { AsientoContable } from '@core/models/auxiliares/asiento-contable';
import { ComprobanteContable } from '@core/models/auxiliares/comprobante-contable';
import { Integracion } from '@core/models/procesos/integracion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { IntegracionService } from '@core/services/procesos/integracion.service';
import { ModificacionService } from '@core/services/procesos/modificacion.service';
import { Id } from '@core/types/id';
import moment from 'moment';
import { forkJoin, from, of, pipe } from 'rxjs';
import { filter, map, switchMap, tap, toArray } from 'rxjs/operators';

export const contabilizarModificaciones = (
  lineaEmpresa: Id,
  fechaIntegraciones: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _modificacion: ModificacionService,
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
      let convertirModificaciones = from(
        integracionesCandidatas(integraciones)
      ).pipe(
        generarComprobanteContableModificacion(
          lineaEmpresa,
          fechaIntegraciones,
          observaciones,
          _activo,
          _unidadAdministrativa,
          _modificacion
        )
      );
      return convertirModificaciones.pipe(
        toArray(),
        switchMap(comprobantes => {
          return _contabilizacion.contabilizar(comprobantes).pipe(
            tap(resultado => {
              if (resultado.data.length > 0) {
                if (notificar) {
                  let { data } = resultado;
                  let exitosas = data.filter(
                    comprobante => comprobante.estatus
                  );
                  let fallidas = data.filter(
                    comprobante => !comprobante.estatus
                  );
                  let mensaje = `De ${data.length} modificaciones enviadas, ${exitosas.length} 
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

const generarComprobanteContableModificacion = (
  lineaEmpresa: Id,
  fechaIntegracion: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _modificacion: ModificacionService
) =>
  pipe(
    switchMap((integracion: Integracion) => {
      let activoId = Number(
        String(integracion.activo).split(',').length > 1
          ? Number(String(integracion.activo).split(',')[0])
          : Number(integracion.activo)
      );
      let buscarActivo = _activo.buscarPorId(activoId);
      let buscarModificacion = _modificacion.buscarPorActivo(activoId);
      return forkJoin([buscarActivo, buscarModificacion]).pipe(
        switchMap(([activoEncontrado, modificacionEncontrada]) =>
          _unidadAdministrativa
            .buscarPorId(activoEncontrado.ubicacion.unidadAdministrativaId)
            .pipe(
              map(unidadAdministrativaEncontada => {
                let { procesoComprobante, aprobado, procesoTipo } = integracion;
                let { codigoCentroCostos, fuenteFinanciamiento } =
                  activoEncontrado.detalle;
                let { unidadOrganizativa } = unidadAdministrativaEncontada;
                let descripcion = `Modificacion: ${observaciones}`;
                let monto = 0; // el monto se calcula en breve
                let fecha = moment(fechaIntegracion).format('YYYY-MM-DD');
                let { cuentasContables } = modificacionEncontrada;
                let comprobante = procesoComprobante;
                let asientosContables = cuentasContables.map(
                  ccp =>
                    <AsientoContable>{
                      comprobante: comprobante,
                      centroCostos: codigoCentroCostos,
                      cuentaContable: ccp.cuentaContable,
                      procedencia: ccp.procedencia,
                      unidadOrganizativa: unidadOrganizativa,
                      descripcion: descripcion,
                      monto: Number(ccp.monto),
                      creado: fecha,
                    }
                );
                //se calsula el monto del comprobante
                asientosContables
                  .filter(ac => ac.procedencia === 'D')
                  .forEach(ac => (monto += ac.monto));
                let comprobanteSalida = <ComprobanteContable>{
                  procede: TIPOS_PROCEDE[procesoTipo],
                  aprobado: aprobado,
                  comprobante: comprobante,
                  centroCostos: codigoCentroCostos,
                  fuenteFinanciamiento: fuenteFinanciamiento,
                  lineaEmpresa: lineaEmpresa,
                  unidadAdministrativa: unidadOrganizativa,
                  creado: fecha,
                  monto: monto,
                  descripcion: descripcion,
                  asientosContables: asientosContables,
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
    .filter(integracion => integracion.procesoTipo === 'MODIFICACIÓN')
    .filter(integracion => integracion.aprobado == 1)
    .filter(integracion => integracion.integrado == 1);
