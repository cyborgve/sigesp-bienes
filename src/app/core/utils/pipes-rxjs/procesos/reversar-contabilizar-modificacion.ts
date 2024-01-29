import { TIPOS_PROCEDE } from '@core/constants/tipos-procede';
import { AsientoContable } from '@core/models/auxiliares/asiento-contable';
import { ComprobanteContable } from '@core/models/auxiliares/comprobante-contable';
import { Integracion } from '@core/models/procesos/integracion';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { ContabilizacionService } from '@core/services/otros-modulos/contabilidad.service';
import { ModificacionService } from '@core/services/procesos/modificacion.service';
import { Id } from '@core/types/id';
import moment from 'moment';
import { forkJoin, from, pipe } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';

export const reversarContabilizarModificaciones = (
  lineaEmpresa: Id,
  fechaIntegraciones: Date,
  observaciones: string,
  _activo: ActivoService,
  _unidadAdministrativa: UnidadAdministrativaService,
  _modificacion: ModificacionService,
  _contabilizacion: ContabilizacionService
) =>
  pipe(
    switchMap((integraciones: Integracion[]) => {
      let modificaciones = integraciones
        .filter(inte => inte.procesoTipo === 'MODIFICACIÓN')
        .filter(integracion => integracion.aprobado === 0);
      let convertirModificaciones = from(modificaciones).pipe(
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
                let { procesoComprobante, aprobado, procesoTipo } = integracion;
                let { codigoCentroCostos, fuenteFinanciamiento } =
                  activoEncontrado.detalle;
                let { unidadOrganizativa } = unidadAdministrativaEncontada;
                let descripcion = `Modificacion: ${observaciones}`;
                let monto = 0; // el monto se calcula en breve
                let fecha = moment(fechaIntegracion).format('YYYY-MM-DD');
                let { cuentasContables } = modificacionEncontrada;
                let asientosContables = cuentasContables.map(
                  ccp =>
                    <AsientoContable>{
                      comprobante: procesoComprobante,
                      centroCostos: codigoCentroCostos,
                      cuentaContable: ccp.cuentaContable,
                      procedencia: ccp.procedencia,
                      unidadOrganizativa: unidadOrganizativa,
                      descripcion: descripcion,
                      monto: ccp.monto,
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
                  comprobante: procesoComprobante,
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
