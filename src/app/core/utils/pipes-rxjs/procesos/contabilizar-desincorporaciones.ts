import { TIPOS_PROCEDE } from '@core/constants/tipos-procede';
import { ComprobanteContable } from '@core/models/auxiliares/comprobante-contable';
import { Integracion } from '@core/models/procesos/integracion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { DesincorporacionService } from '@core/services/procesos/desincorporacion.service';
import { Id } from '@core/types/id';
import { forkJoin, from, pipe } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';

export const contabilizarDesincorporaciones = (
  lineaEmpresa: Id,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _desincorporacion: DesincorporacionService,
  _contabilizacion: ContabilizacionService
) =>
  pipe(
    switchMap((integraciones: Integracion[]) => {
      let desincorporaciones = integraciones.filter(
        inte => inte.tipoProceso === 'DESINCORPORACIÓN'
      );
      let convertirDesincorporaciones = from(desincorporaciones).pipe(
        generarComprobanteContableDesincorporacion(
          lineaEmpresa,
          _activo,
          _unidadAdministrativa,
          _desincorporacion
        )
      );
      return convertirDesincorporaciones.pipe(
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
  _desincorporacion: DesincorporacionService
) =>
  pipe(
    switchMap((integracion: Integracion) => {
      let buscarActivo = _activo.buscarPorId(integracion.activo);
      let buscarDesincorporacion = _desincorporacion.buscarPorId(
        Number(integracion.comprobante.split(',')[1])
      );
      return forkJoin([buscarActivo, buscarDesincorporacion]).pipe(
        switchMap(([activoEncontrado, desincorporacionEncontrada]) =>
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
                let { debe, haber } = desincorporacionEncontrada;
                let { tipoProceso } = integracion;
                return <ComprobanteContable>{
                  procede: TIPOS_PROCEDE[tipoProceso],
                  lineaEmpresa: lineaEmpresa,
                  centroCostos: codigoCentroCostos,
                  unidadAdministrativa: unidadOrganizativa,
                  fuenteFinanciamiento: fuenteFinanciamiento,
                  comprobante: comprobante,
                  monto: debe,
                  creado: new Date(),
                  asientosContables: [
                    {
                      centroCostos: codigoCentroCostos,
                      comprobante: comprobante,
                      cuentaContable: desCuentaContableDebe,
                      procedencia: 'D',
                      monto: debe,
                      unidadOrganizativa: unidadOrganizativa,
                    },
                    {
                      centroCostos: codigoCentroCostos,
                      comprobante: comprobante,
                      cuentaContable: desCuentaContableHaber,
                      procedencia: 'H',
                      monto: haber,
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
