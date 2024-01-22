import { TIPOS_PROCEDE } from '@core/constants/tipos-procede';
import { ComprobanteContable } from '@core/models/auxiliares/comprobante-contable';
import { Integracion } from '@core/models/procesos/integracion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { ModificacionService } from '@core/services/procesos/modificacion.service';
import { Id } from '@core/types/id';
import { forkJoin, from, pipe } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';

export const contabilizarModificaciones = (
  lineaEmpresa: Id,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _modificacion: ModificacionService,
  _contabilizacion: ContabilizacionService
) =>
  pipe(
    switchMap((integraciones: Integracion[]) => {
      let modificaciones = integraciones.filter(
        inte => inte.tipoProceso === 'MODIFICACIÓN'
      );
      let convertirModificaciones = from(modificaciones).pipe(
        generarComprobanteContableModificacion(
          lineaEmpresa,
          _activo,
          _unidadAdministrativa,
          _modificacion
        )
      );
      return convertirModificaciones.pipe(
        toArray(),
        switchMap(comprobantes => {
          return _contabilizacion.contabilizar(comprobantes).pipe(
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

const generarComprobanteContableModificacion = (
  lineaEmpresa: Id,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _modificacion: ModificacionService
) =>
  pipe(
    switchMap((integracion: Integracion) => {
      let activoId =
        String(integracion.activo).split(',').length > 1
          ? Number(String(integracion.activo).split(',')[0])
          : Number(integracion.activo);
      let buscarActivo = _activo.buscarPorId(activoId);
      let buscarModificacion = _modificacion.buscarPorActivo(activoId);
      return forkJoin([buscarActivo, buscarModificacion]).pipe(
        switchMap(([activoEncontrado, modificacionEncontrada]) =>
          _unidadAdministrativa
            .buscarPorId(activoEncontrado.ubicacion.unidadAdministrativaId)
            .pipe(
              map(unidadAdministrativaEncontada => {
                let { comprobante } = integracion;
                let { codigoCentroCostos, fuenteFinanciamiento } =
                  activoEncontrado.detalle;
                let { cuentaContableDebe, cuentaContableHaber } =
                  activoEncontrado.depreciacion;
                let { unidadOrganizativa } = unidadAdministrativaEncontada;
                let fechaIntegracion = integracion.creado;
                //FIXME: hay que colocar el monto total de la modificacion.
                let monto = 0;
                let comprobanteSalida = <ComprobanteContable>{
                  procede: TIPOS_PROCEDE[integracion.tipoProceso],
                  lineaEmpresa: lineaEmpresa,
                  centroCostos: codigoCentroCostos,
                  unidadAdministrativa: unidadOrganizativa,
                  fuenteFinanciamiento: fuenteFinanciamiento,
                  comprobante: comprobante,
                  monto: monto,
                  creado: new Date(),
                  asientosContables: [
                    {
                      centroCostos: codigoCentroCostos,
                      comprobante: comprobante,
                      cuentaContable: cuentaContableDebe,
                      procedencia: 'D',
                      monto: monto,
                      unidadOrganizativa: unidadOrganizativa,
                    },
                    {
                      centroCostos: codigoCentroCostos,
                      comprobante: comprobante,
                      cuentaContable: cuentaContableHaber,
                      procedencia: 'H',
                      monto: monto,
                      unidadOrganizativa: unidadOrganizativa,
                    },
                  ],
                };
                console.log(comprobanteSalida);
                return comprobanteSalida;
              })
            )
        )
      );
    })
  );
