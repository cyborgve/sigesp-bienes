import { Retorno } from '@core/models/procesos/retorno';
import { RetornoActivo } from './../../models/procesos/retorno';
import { TipoResponsable } from '@core/types/tipo-responsable';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Id } from '@core/types/id';
import { TipoProceso } from '@core/types/tipo-proceso';
import { IncorporacionService } from '../procesos/incorporacion.service';
import { EmpresaService } from '../otros-modulos/empresa.service';
import { CausaMovimientoService } from '../definiciones/causa-movimiento.service';
import { ResponsableService } from '../otros-modulos/responsable.service';
import { UnidadAdministrativaService } from '../definiciones/unidad-administrativa.service';
import { SedeService } from '../definiciones/sede.service';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';
import { ActivoService } from '../definiciones/activo.service';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { Desincorporacion } from '@core/models/procesos/desincorporacion';
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { Modificacion } from '@core/models/procesos/modificacion';
import { Reasignacion } from '@core/models/procesos/reasignacion';

@Injectable({
  providedIn: 'root',
})
export class InformacionProcesoService {
  constructor(
    private _empresa: EmpresaService,
    private _causaMovimiento: CausaMovimientoService,
    private _responsable: ResponsableService,
    private _unidadAdministrativa: UnidadAdministrativaService,
    private _sede: SedeService,
    private _activo: ActivoService
  ) {}

  /**
   * Obtiene información detallada sobre un proceso según su ID y tipo.
   * @param proceso ID del proceso.
   * @param tipoProceso Tipo de proceso.
   * @returns Un objeto con información detallada del proceso.
   */
  obtener(proceso: any, tipoProceso: TipoProceso): Observable<any> {
    let resultado: any = {}; // Objeto para almacenar el resultado
    switch (tipoProceso) {
      case 'ACTA DE PRESTAMO':
        resultado = this.actaPrestamo(proceso);
        break;
      case 'CAMBIO DE RESPONSABLE':
        resultado = this.cambioResponsable(proceso);
        break;
      case 'AUTORIZACIÓN DE SALIDA':
        resultado = this.autorizacionSalida(proceso);
        break;
      case 'DEPRECIACIÓN':
        resultado = this.depreciacion(proceso);
        break;
      case 'DESINCORPORACIÓN':
        resultado = this.desincorporacion(proceso);
        break;
      case 'ENTREGA DE UNIDAD':
        resultado = this.entregaUnidad(proceso);
        break;
      case 'INCORPORACIÓN':
        resultado = this.incorporacion(proceso);
        break;
      case 'MODIFICACIÓN':
        resultado = this.modificacion(proceso);
        break;
      case 'REASIGNACIÓN':
        resultado = this.reasignacion(proceso);
        break;
      case 'RETORNO DE ACTIVO':
        return this.retorno(proceso);
        break;
    }
    return resultado; // Devuelve el resultado obtenido
  }

  private denominacionEntidad(servicio: any, entidadId: Id): Observable<any> {
    return servicio
      .buscarPorId(entidadId)
      .pipe(map((entidad: any) => entidad.denominacion));
  }

  private empresa = (id: Id) =>
    this._empresa.datosGenerales(id).pipe(map(empresa => empresa.nombre));

  private causaMovimiento = (id: Id) =>
    this.denominacionEntidad(this._causaMovimiento, id);

  private responsable = (id: Id) =>
    this._responsable
      .buscarPorId(id)
      .pipe(map(resp => `${resp.rif} - ${resp.nombre} ${resp.apellido}`));

  private unidadAdministrativa = (id: Id) =>
    this.denominacionEntidad(this._unidadAdministrativa, id);

  private sede = (id: Id) => this.denominacionEntidad(this._sede, id);

  private activo = (id: Id) => this.denominacionEntidad(this._activo, id);

  private actaPrestamo(actaPrestamo: ActaPrestamo): Observable<any> {
    let obtenerInformacion = [
      this.empresa(actaPrestamo.empresaId),
      this.unidadAdministrativa(actaPrestamo.unidadAdministrativaCedente),
      this.responsable(actaPrestamo.unidadCedenteResponsable),
      this.unidadAdministrativa(actaPrestamo.unidadAdministrativaReceptora),
      this.responsable(actaPrestamo.unidadReceptoraResponsable),
      this.responsable(actaPrestamo.testigo),
    ];
    return forkJoin(obtenerInformacion).pipe(
      map(
        ([
          empresa,
          unidadCedente,
          responsableCedente,
          unidadReceptora,
          responsableReceptora,
          testigo,
        ]) => ({
          empresa: empresa,
          id: actaPrestamo.id,
          comprobante: actaPrestamo.comprobante.toString().substring(5),
          unidadAdministrativaCedente: unidadCedente,
          unidadCedenteResponsable: responsableCedente,
          unidadAdministrativaReceptora: unidadReceptora,
          unidadReceptoraResponsable: responsableReceptora,
          testigo: testigo,
          notas: actaPrestamo.notas,
          activos: actaPrestamo.activos,
          creado: new Date(actaPrestamo.creado),
          modificado: new Date(actaPrestamo.modificado),
        })
      )
    );
  }

  private cambioResponsable(
    cambioResponsable: CambioResponsable
  ): Observable<any> {
    let obtenerInformacion = [
      this.empresa(cambioResponsable.empresaId),
      this.activo(cambioResponsable.activo),
      this.responsable(cambioResponsable.responsableActual),
      this.responsable(cambioResponsable.nuevoResponsable),
    ];
    return forkJoin(obtenerInformacion).pipe(
      map(([empresa, activo, responsableActual, nuevoResponsable]) => ({
        empresaId: empresa,
        id: cambioResponsable.id,
        comprobante: cambioResponsable.comprobante.toString().substring(5),
        activo: activo,
        identificador: cambioResponsable.identificador,
        serial: cambioResponsable.serial,
        tipoResponsable: cambioResponsable.tipoResponsable,
        responsableActual: responsableActual,
        nuevoResponsable: nuevoResponsable,
        observaciones: cambioResponsable.observaciones,
        creado: new Date(cambioResponsable.creado),
        modificado: new Date(cambioResponsable.modificado),
      }))
    );
  }

  private autorizacionSalida(
    autorizacionSalida: AutorizacionSalida
  ): Observable<any> {
    let obtenerInformacion = [
      this.empresa(autorizacionSalida.empresaId),
      this.unidadAdministrativa(autorizacionSalida.unidadAdministrativaCedente),
    ];
    return forkJoin(obtenerInformacion).pipe(
      map(([empresa, unidadAdministrativaCedente]) => ({
        empresaId: empresa,
        id: autorizacionSalida.id,
        comprobante: autorizacionSalida.comprobante.toString().substring(5),
        unidadAdministrativaCedente: unidadAdministrativaCedente,
        empresaPersonaEntrega: autorizacionSalida.empresaPersonaEntrega,
        representanteEmpresa: autorizacionSalida.representanteEmpresa,
        explicacion: autorizacionSalida.explicacion,
        observaciones: autorizacionSalida.observaciones,
        creado: new Date(autorizacionSalida.creado),
        modificado: new Date(autorizacionSalida.modificado),
      }))
    );
  }

  private depreciacion(depreciacion: Depreciacion): Observable<any> {
    let obtenerInformacion = [
      this.empresa(depreciacion.empresaId),
      this.activo(depreciacion.activo),
    ];
    return forkJoin(obtenerInformacion).pipe(
      map(([empresa, activo]) => ({
        empresaId: empresa,
        id: depreciacion.id,
        comprobante: depreciacion.comprobante.toString().substring(5),
        activo: this.activo(depreciacion.activo),
        serial: depreciacion.serial,
        identificador: depreciacion.identificador,
        fechaCompra: new Date(depreciacion.fechaCompra),
        fechaIncorporacion: new Date(depreciacion.fechaIncorporacion),
        metodo: depreciacion.metodo,
        costo: depreciacion.costo,
        valorRescate: depreciacion.valorRescate,
        montoDepreciar: depreciacion.montoDepreciar,
        vidaUtil: depreciacion.vidaUtil,
        depreciacionMensual: depreciacion.depreciacionMensual,
        depreciacionAnual: depreciacion.depreciacionAnual,
        observaciones: depreciacion.observaciones,
        detalles: depreciacion.detalles,
        creado: new Date(depreciacion.creado),
        modificado: new Date(depreciacion.modificado),
      }))
    );
  }

  private desincorporacion(
    desincorporacion: Desincorporacion
  ): Observable<any> {
    let buscarInformacion = [
      this.empresa(desincorporacion.empresaId),
      this.causaMovimiento(desincorporacion.causaMovimiento),
      this.unidadAdministrativa(desincorporacion.unidadAdministrativa),
    ];
    return forkJoin(buscarInformacion).pipe(
      map(([empresa, causaMovimiento, unidadAdministrativa]) => ({
        empresaId: empresa,
        id: desincorporacion.id,
        comprobante: desincorporacion.comprobante.toString().substring(5),
        causaMovimiento: causaMovimiento,
        unidadAdministrativa: unidadAdministrativa,
        observaciones: desincorporacion.observaciones,
        activos: desincorporacion.activos,
        total: desincorporacion.total,
        cuentasContables: desincorporacion.cuentasContables,
        debe: desincorporacion.debe,
        haber: desincorporacion.debe,
        diferencia: desincorporacion.haber,
        creado: new Date(desincorporacion.creado),
        modificado: new Date(desincorporacion.modificado),
      }))
    );
  }

  private entregaUnidad(entregaUnidad: EntregaUnidad): Observable<any> {
    let buscarInformacion = [
      this.empresa(entregaUnidad.empresaId),
      this.unidadAdministrativa(entregaUnidad.unidadAdministrativa),
      this.sede(entregaUnidad.sede),
      this.responsable(entregaUnidad.responsableActual),
      this.responsable(entregaUnidad.nuevoResponsable),
    ];
    return forkJoin(buscarInformacion).pipe(
      map(
        ([
          empresa,
          unidadAdministrativa,
          sede,
          responsableActual,
          nuevoResponsable,
        ]) => ({
          empresaId: empresa,
          id: entregaUnidad.id,
          comprobante: entregaUnidad.comprobante.toString().substring(5),
          unidadAdministrativa: unidadAdministrativa,
          sede: sede,
          responsableActual: responsableActual,
          nuevoResponsable: nuevoResponsable,
          obervaciones: entregaUnidad.obervaciones,
          creado: new Date(entregaUnidad.creado),
          modificado: new Date(entregaUnidad.modificado),
        })
      )
    );
  }

  private incorporacion(incorporacion: Incorporacion): Observable<any> {
    const obtenerDenominaciones = [
      this.empresa(incorporacion.empresaId),
      this.causaMovimiento(incorporacion.causaMovimiento),
      this.responsable(incorporacion.responsablePrimario),
      this.responsable(incorporacion.responsableUso),
      this.unidadAdministrativa(incorporacion.unidadAdministrativa),
      this.sede(incorporacion.sede),
    ];
    return forkJoin(obtenerDenominaciones).pipe(
      map(
        ([
          empresa,
          causaMovimiento,
          responsablePrimario,
          responsableUso,
          unidadAdministrativa,
          sede,
        ]) => ({
          empresaId: empresa,
          id: incorporacion.id,
          comprobante: incorporacion.comprobante.toString().substring(5),
          causaMovimiento: causaMovimiento,
          responsablePrimario: responsablePrimario,
          responsableUso: responsableUso,
          unidadAdministrativa: unidadAdministrativa,
          sede: sede,
          fechaEntrega: incorporacion.fechaEntrega,
          observaciones: incorporacion.observaciones,
          activos: incorporacion.activos,
          creado: incorporacion.creado,
          modificado: incorporacion.modificado,
        })
      )
    );
  }

  private modificacion(modificacion: Modificacion): Observable<any> {
    let buscarInformacion = [
      this.empresa(modificacion.empresaId),
      this.causaMovimiento(modificacion.causaMovimiento),
      this.activo(modificacion.activo),
    ];
    return forkJoin(buscarInformacion).pipe(
      map(([empresa, causaMovimiento, activo]) => ({
        empresaId: empresa,
        id: modificacion.id,
        comprobante: modificacion.comprobante.toString().substring(5),
        causaMovimiento: causaMovimiento,
        activo: activo,
        identificador: modificacion.identificador,
        serial: modificacion.serial,
        observaciones: modificacion.observaciones,
        modificaciones: modificacion.modificaciones,
        cuentasContables: modificacion.cuentasContables,
      }))
    );
  }

  private reasignacion(reasignacion: Reasignacion) {
    let obtenerInformacion = [
      this.empresa(reasignacion.empresaId),
      this.causaMovimiento(reasignacion.causaMovimiento),
      this.responsable(reasignacion.responsablePrimario),
      this.responsable(reasignacion.responsableUso),
      this.sede(reasignacion.sede),
    ];
    return forkJoin(obtenerInformacion).pipe(
      map(
        ([
          empresa,
          causaMovimiento,
          responsablePrimario,
          responsableUso,
          sede,
        ]) => ({
          empresaId: empresa,
          id: reasignacion.id,
          comprobante: reasignacion.comprobante.toString().substring(5),
          causaMovimiento: causaMovimiento,
          responsablePrimario: responsablePrimario,
          responsableUso: responsableUso,
          sede: sede,
          fechaEntrega: new Date(reasignacion.fechaEntrega),
          observaciones: reasignacion.observaciones,
          activos: reasignacion.activos,
          creado: new Date(reasignacion.creado),
          modificado: new Date(reasignacion.modificado),
        })
      )
    );
  }

  private retorno(retorno: Retorno) {
    let obtenerInformacion = [];
    return forkJoin(obtenerInformacion).pipe(
      map(([empresa]) => ({
        empresaId: empresa,
        id: retorno.id,
        comprobante: retorno.comprobante.toString().substring(5),
        beneficiario: retorno.beneficiario, // TODO: obtener informacion
        observaciones: retorno.observaciones,
        activos: retorno.activos,
        creado: new Date(retorno.creado),
        modificado: new Date(retorno.modificado),
      }))
    );
  }
}
