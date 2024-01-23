import { TIPOS_PROCEDE } from '@core/constants/tipos-procede';
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

const generarComprobanteContableDesincorporacion = (
  lineaEmpresa: Id,
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
      let buscarActivo = _activo.buscarPorId(activoId);
      let buscarDesincorporacion = _desincorporacion.buscarPorActivo(activoId);
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
                let fechaIntegracion = moment(integracion.creado).format(
                  'YYYY-MM-DD'
                );
                let descripcion = 'Prueba Integracion Desincorporacion';
                let monto = desincorporacionEncontrada.debe;
                let comprobanteSalida = <ComprobanteContable>{
                  procede: TIPOS_PROCEDE[integracion.tipoProceso],
                  lineaEmpresa: lineaEmpresa,
                  centroCostos: codigoCentroCostos,
                  unidadAdministrativa: unidadOrganizativa,
                  fuenteFinanciamiento: fuenteFinanciamiento,
                  comprobante: comprobante,
                  aprobado: 1,
                  creado: fechaIntegracion,
                  monto: monto,
                  descripcion: descripcion,
                  asientosContables: [
                    {
                      centroCostos: codigoCentroCostos,
                      comprobante: comprobante,
                      cuentaContable: desCuentaContableDebe,
                      procedencia: 'D',
                      monto: monto,
                      descripcion: descripcion,
                      creado: fechaIntegracion,
                      unidadOrganizativa: unidadOrganizativa,
                    },
                    {
                      centroCostos: codigoCentroCostos,
                      comprobante: comprobante,
                      cuentaContable: desCuentaContableHaber,
                      procedencia: 'H',
                      monto: monto,
                      creado: fechaIntegracion,
                      descripcion: descripcion,
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
