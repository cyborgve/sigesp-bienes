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
        generarComprobanteContableDesincorporacion(
          lineaEmpresa,
          _activo,
          _unidadAdministrativa,
          _modificacion
        )
      );
      return convertirModificaciones.pipe(
        toArray(),
        switchMap(comprobantes =>
          _contabilizacion.contabilizar(comprobantes).pipe(
            tap(res => {
              //aqui se puede realizar una accion con la respuesta
              console.log(res);
            }),
            map(() => integraciones)
          )
        )
      );
    })
  );

const generarComprobanteContableDesincorporacion = (
  lineaEmpresa: Id,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _modificaciones: ModificacionService
) =>
  pipe(
    switchMap((integracion: Integracion) => {
      let buscarActivo = _activo.buscarPorId(integracion.activo);
      let buscarModificacion = _modificaciones.buscarPorId(
        Number(integracion.comprobante.split(',')[1])
      );
      return forkJoin([buscarActivo, buscarModificacion]).pipe(
        switchMap(([activoEncontrado, modificacionEncontrada]) =>
          _unidadAdministrativa
            .buscarPorId(activoEncontrado.ubicacion.unidadAdministrativaId)
            .pipe(
              map(unidadAdministrativaEncontada => {
                let { comprobante } = integracion;
                let { codigoCentroCostos, fuenteFinanciamiento } =
                  activoEncontrado.detalle;
                let { desCuentaContableDebe, desCuentaContableHaber } =
                  activoEncontrado.integracion;
                let { unidadOrganizativa } = unidadAdministrativaEncontada;
                //let { debe, haber } = desincorporacionEncontrada;
                let { tipoProceso } = integracion;
                return <ComprobanteContable>{
                  procede: TIPOS_PROCEDE[tipoProceso],
                  lineaEmpresa: lineaEmpresa,
                  centroCostos: codigoCentroCostos,
                  unidadAdministrativa: unidadOrganizativa,
                  fuenteFinanciamiento: fuenteFinanciamiento,
                  comprobante: comprobante,
                  monto: 0,
                  creado: new Date(),
                  asientosContables: [
                    {
                      centroCostos: codigoCentroCostos,
                      comprobante: comprobante,
                      cuentaContable: desCuentaContableDebe,
                      procedencia: 'D',
                      monto: 0,
                      unidadOrganizativa: unidadOrganizativa,
                    },
                    {
                      centroCostos: codigoCentroCostos,
                      comprobante: comprobante,
                      cuentaContable: desCuentaContableHaber,
                      procedencia: 'H',
                      monto: 0,
                      unidadOrganizativa: unidadOrganizativa,
                    },
                  ],
                };
              })
            )
        )
      );
    })
  );
