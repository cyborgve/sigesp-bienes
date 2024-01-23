import { TIPOS_PROCEDE } from '@core/constants/tipos-procede';
import { ComprobanteContable } from '@core/models/auxiliares/comprobante-contable';
import { Integracion } from '@core/models/procesos/integracion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { Id } from '@core/types/id';
import moment from 'moment';
import { forkJoin, from, pipe } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';

export const contabilizarDepreciacionesMensuales = (
  lineaEmpresa: Id,
  fechaIntegraciones: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _depreciacion: DepreciacionService,
  _contabilizacion: ContabilizacionService
) =>
  pipe(
    switchMap((integraciones: Integracion[]) => {
      let depreciaciones = integraciones
        .filter(inte => inte.tipoProceso === 'DEPRECIACIÓN MENSUAL')
        .filter(integracion => integracion.aprobado === 1);
      let convertirDepreciaciones = from(depreciaciones).pipe(
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
                let { comprobante, aprobado } = integracion;
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
                let comprobanteSalida = <ComprobanteContable>{
                  procede: TIPOS_PROCEDE[integracion.tipoProceso],
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
                console.log(comprobanteSalida);
                return comprobanteSalida;
              })
            )
        )
      );
    })
  );
