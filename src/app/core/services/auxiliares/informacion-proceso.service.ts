import { Retorno } from '@core/models/procesos/retorno';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Id } from '@core/types/id';
import { TipoProceso } from '@core/types/tipo-proceso';
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
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { TIPOS_ACTIVO } from '@core/constants/tipos_activo';
import { MonedaService } from '../otros-modulos/moneda.service';
import { convertirActivoProceso } from '@core/utils/funciones/convertir-activo-proceso';
import { ProveedorService } from '../otros-modulos/proveedor.service';
import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { TipoComponenteService } from '../definiciones/tipo-componente.service';
import { BeneficiarioService } from '../otros-modulos/beneficiario.service';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';

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
    private _activo: ActivoService,
    private _moneda: MonedaService,
    private _proveedor: ProveedorService,
    private _tipoComponente: TipoComponenteService,
    private _beneficario: BeneficiarioService
  ) {}

  obtener(proceso: any, tipoProceso: TipoProceso): Observable<any> {
    let resultado: any = {}; // Objeto para almacenar el resultado
    switch (tipoProceso) {
      case 'ACTA DE PRÉSTAMO':
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
      case 'RETORNO':
        resultado = this.retorno(proceso);
        break;
    }
    return resultado; // Devuelve el resultado obtenido
  }

  /** utilidades: denominaciones de partes de los procesos */

  private denominacionEntidad(servicio: any, entidadId: Id): Observable<any> {
    return servicio
      .buscarPorId(entidadId)
      .pipe(map((entidad: any) => entidad.denominacion));
  }

  private empresa = (empresa: Id) =>
    this._empresa.datosGenerales(empresa).pipe(map(empresa => empresa.nombre));

  private causaMovimiento = (causaMovimiento: Id) =>
    this.denominacionEntidad(this._causaMovimiento, causaMovimiento);

  private proveedor = (proveedor: Id) =>
    this._proveedor
      .buscarPorId(proveedor)
      .pipe(map(proveedor => `${proveedor.rif} ${proveedor.denominacion}`));

  private responsable = (responsable: Id) =>
    this._responsable
      .buscarPorId(responsable)
      .pipe(map(resp => `${resp.cedula} - ${resp.nombres} ${resp.apellidos}`));

  private unidadAdministrativa = (unidadAdministrativa: Id) =>
    this.denominacionEntidad(this._unidadAdministrativa, unidadAdministrativa);

  private sede = (sede: Id) => this.denominacionEntidad(this._sede, sede);

  private activo = (activoId: Id) =>
    this.denominacionEntidad(this._activo, activoId);

  private tipoActivo = (tipoAct: string) =>
    TIPOS_ACTIVO.find(tipoActivo => tipoActivo.substring(0, 3) === tipoAct);

  private valorActivo = (activo: Id) =>
    this._activo
      .buscarPorId(activo)
      .pipe(map(activo => activo.valorAdquisicion));

  private identificadorActivo = (activo: Id) =>
    this._activo
      .buscarPorId(activo)
      .pipe(map(activo => activo.serialRotulacion));

  private isoMonedaActivo = (activo: Id) =>
    this._activo
      .buscarPorId(activo)
      .pipe(
        switchMap(activo =>
          this._moneda
            .buscarPorId(activo.monedaId)
            .pipe(map(moneda => moneda.iso))
        )
      );

  private codigoActivo = (activo: Id) =>
    this._activo
      .buscarPorId(activo)
      .pipe(map(activo => activo.codigo.substring(5)));

  private tipoComponente = (tipoComponente: Id) =>
    this.denominacionEntidad(this._tipoComponente, tipoComponente);

  private beneficiario = (beneficiario: Id) =>
    this._beneficario
      .buscarPorId(beneficiario)
      .pipe(
        map(beneficiario => `${beneficiario.cedula} - ${beneficiario.nombre}`)
      );

  private activoProceso = (activoProceso: ActivoProceso) => {
    let buscarInformacion = [
      this.empresa(activoProceso.empresaId),
      this.valorActivo(activoProceso.activo),
      this.isoMonedaActivo(activoProceso.activo),
      this.identificadorActivo(activoProceso.activo),
    ];
    return forkJoin(buscarInformacion).pipe(
      map(([empresa, valorActivo, isoMoneda, identificador]) => ({
        empresaId: empresa,
        id: activoProceso.id,
        proceso: activoProceso.proceso,
        activo: activoProceso.proceso,
        tipoActivo: this.tipoActivo(activoProceso.tipoActivo),
        codigo: activoProceso.codigo.substring(5),
        denominacion: activoProceso.denominacion,
        identificador: identificador,
        valor: Number(valorActivo).toFixed(2) + ' ' + isoMoneda,
        creado: new Date(activoProceso.creado),
        modificado: new Date(activoProceso.modificado),
      }))
    );
  };

  private activosProceso = (activosProceso: ActivoProceso[]) =>
    forkJoin(activosProceso.map(ap => this.activoProceso(ap)));

  private componenteProceso = (componente: ComponenteProceso) => {
    let buscarInformacion = [
      this.empresa(componente.empresaId),
      this.tipoComponente(componente.tipoComponente),
    ];
    return forkJoin(buscarInformacion).pipe(
      map(([empresa, tipoComponente]) => ({
        empresaId: empresa,
        id: componente.id,
        codigo: componente.codigo,
        proceso: componente.proceso,
        componente: componente.id,
        tipoComponente: tipoComponente,
        denominacion: componente.denominacion,
        creado: new Date(componente.creado),
        modificado: new Date(componente.modificado),
      }))
    );
  };

  private componentesProceso = (componentes: ComponenteProceso[]) =>
    forkJoin(componentes.map(componente => this.componenteProceso(componente)));

  private buscarActivoConvertir = (id: Id) => {
    return this._activo.buscarPorId(id).pipe(
      map(activo => convertirActivoProceso(activo)),
      switchMap(activoProceso => this.activoProceso(activoProceso))
    );
  };

  /** ACTA DE PRESTAMO */
  private actaPrestamo(actaPrestamo: ActaPrestamo): Observable<any> {
    let obtenerInformacion = [
      this.empresa(actaPrestamo.empresaId),
      this.unidadAdministrativa(actaPrestamo.unidadAdministrativaCedente),
      this.responsable(actaPrestamo.unidadCedenteResponsable),
      this.unidadAdministrativa(actaPrestamo.unidadAdministrativaReceptora),
      this.responsable(actaPrestamo.unidadReceptoraResponsable),
      this.responsable(actaPrestamo.testigo),
      this.activosProceso(actaPrestamo.activos),
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
          activos,
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
          activos: activos,
          creado: new Date(actaPrestamo.creado),
          modificado: new Date(actaPrestamo.modificado),
        })
      )
    );
  }

  /** AUTORIZACION DE SALIDA */
  private autorizacionSalida(
    autorizacionSalida: AutorizacionSalida
  ): Observable<any> {
    let obtenerInformacion = [
      this.empresa(autorizacionSalida.empresaId),
      this.unidadAdministrativa(autorizacionSalida.unidadAdministrativa),
      this.proveedor(autorizacionSalida.empresaAutorizada),
      this.responsable(autorizacionSalida.testigo),
      this.activosProceso(autorizacionSalida.activos),
    ];
    return forkJoin(obtenerInformacion).pipe(
      map(
        ([
          empresa,
          unidadAdministrativaCedente,
          empresaAutorizada,
          testigo,
          activos,
        ]) => ({
          empresaId: empresa,
          id: autorizacionSalida.id,
          comprobante: autorizacionSalida.comprobante.toString().substring(5),
          unidadAdministrativa: unidadAdministrativaCedente,
          empresaAutorizada: empresaAutorizada,
          personaAutorizada: autorizacionSalida.personaAutorizada,
          testigo: testigo,
          explicacion: autorizacionSalida.explicacion,
          observaciones: autorizacionSalida.observaciones,
          activos: activos,
          creado: new Date(autorizacionSalida.creado),
          modificado: new Date(autorizacionSalida.modificado),
        })
      )
    );
  }

  /** CAMBIO DE RESPONSABLE */
  private cambioResponsable(
    cambioResponsable: CambioResponsable
  ): Observable<any> {
    let obtenerInformacion = [
      this.empresa(cambioResponsable.empresaId),
      this.buscarActivoConvertir(cambioResponsable.activo),
      this.responsable(cambioResponsable.responsableActual),
      this.responsable(cambioResponsable.nuevoResponsable),
    ];
    return forkJoin(obtenerInformacion).pipe(
      map(([empresa, activo, responsableActual, nuevoResponsable]) => ({
        empresaId: empresa,
        id: cambioResponsable.id,
        comprobante: cambioResponsable.comprobante.toString().substring(5),
        activos: [activo],
        identificador: cambioResponsable.identificador,
        serial: cambioResponsable.serial,
        tipoResponsable:
          Number(cambioResponsable.tipoResponsable) === 0
            ? 'Responsable Primario'
            : 'Responsable de Uso',
        responsableActual: responsableActual,
        nuevoResponsable: nuevoResponsable,
        observaciones: cambioResponsable.observaciones,
        creado: new Date(cambioResponsable.creado),
        modificado: new Date(cambioResponsable.modificado),
      }))
    );
  }

  /** DEPRECIACION */
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
        activo: activo,
        serial: depreciacion.serial,
        identificador: depreciacion.identificador,
        fechaCompra: new Date(depreciacion.fechaCompra).toLocaleDateString(),
        fechaIncorporacion: new Date(
          depreciacion.fechaIncorporacion
        ).toLocaleDateString(),
        metodo: normalizarMetodoDepreciacion(depreciacion.metodo),
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

  /** DESINCORPORACION */
  private desincorporacion(
    desincorporacion: Desincorporacion
  ): Observable<any> {
    let buscarInformacion = [
      this.empresa(desincorporacion.empresaId),
      this.causaMovimiento(desincorporacion.causaMovimiento),
      this.unidadAdministrativa(desincorporacion.unidadAdministrativa),
      this.activosProceso(desincorporacion.activos),
    ];
    return forkJoin(buscarInformacion).pipe(
      map(([empresa, causaMovimiento, unidadAdministrativa, activos]) => ({
        empresaId: empresa,
        id: desincorporacion.id,
        comprobante: desincorporacion.comprobante.toString().substring(5),
        causaMovimiento: causaMovimiento,
        unidadAdministrativa: unidadAdministrativa,
        observaciones: desincorporacion.observaciones,
        activos: activos,
        total: desincorporacion.total,
        cuentasContables: desincorporacion.cuentasContables,
        debe: desincorporacion.debe,
        haber: desincorporacion.debe,
        diferencia: desincorporacion.haber,
        creado: desincorporacion.creado,
        modificado: desincorporacion.modificado,
      }))
    );
  }

  /** ENTREGA DE UNIDAD */
  private entregaUnidad(entregaUnidad: EntregaUnidad): Observable<any> {
    let buscarInformacion = [
      this.empresa(entregaUnidad.empresaId),
      this.unidadAdministrativa(entregaUnidad.unidadAdministrativa),
      this.sede(entregaUnidad.sede),
      this.responsable(entregaUnidad.responsableAnterior),
      this.responsable(entregaUnidad.nuevoResponsable),
      this.activosProceso(entregaUnidad.activos),
    ];
    return forkJoin(buscarInformacion).pipe(
      map(
        ([
          empresa,
          unidadAdministrativa,
          sede,
          responsableAnterior,
          nuevoResponsable,
          activos,
        ]) => ({
          empresaId: empresa,
          id: entregaUnidad.id,
          comprobante: entregaUnidad.comprobante.toString().substring(5),
          unidadAdministrativa: unidadAdministrativa,
          sede: sede,
          responsableAnterior: responsableAnterior,
          nuevoResponsable: nuevoResponsable,
          observaciones: entregaUnidad.observaciones,
          activos: activos,
          creado: new Date(entregaUnidad.creado),
          modificado: new Date(entregaUnidad.modificado),
        })
      )
    );
  }

  /** INCORPORACION */
  private incorporacion(incorporacion: Incorporacion): Observable<any> {
    let obtenerinformacion = [
      this.empresa(incorporacion.empresaId),
      this.causaMovimiento(incorporacion.causaMovimiento),
      this.responsable(incorporacion.responsablePrimario),
      this.responsable(incorporacion.responsableUso),
      this.unidadAdministrativa(incorporacion.unidadAdministrativa),
      this.sede(incorporacion.sede),
      this.activosProceso(incorporacion.activos),
    ];
    return forkJoin(obtenerinformacion).pipe(
      map(
        ([
          empresa,
          causaMovimiento,
          responsablePrimario,
          responsableUso,
          unidadAdministrativa,
          sede,
          activos,
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
          activos: activos,
          creado: incorporacion.creado,
          modificado: incorporacion.modificado,
        })
      )
    );
  }

  /** MODIFICACION */
  private modificacion(modificacion: Modificacion): Observable<any> {
    let obtenerInformacion = [
      this.empresa(modificacion.empresaId),
      this.causaMovimiento(modificacion.causaMovimiento),
      this.activo(modificacion.activo),
      this.componentesProceso(modificacion.modificaciones),
    ];
    return forkJoin(obtenerInformacion).pipe(
      map(([empresa, causaMovimiento, activo, componentes]) => ({
        empresaId: empresa,
        id: modificacion.id,
        comprobante: modificacion.comprobante.toString().substring(5),
        causaMovimiento: causaMovimiento,
        activo: activo,
        identificador: modificacion.identificador,
        serial: modificacion.serial,
        observaciones: modificacion.observaciones,
        modificaciones: componentes,
        cuentasContables: modificacion.cuentasContables,
        creado: modificacion.creado,
        modificado: modificacion.modificado,
      }))
    );
  }

  /** REASIGNACION */
  private reasignacion(reasignacion: Reasignacion) {
    let obtenerInformacion = [
      this.empresa(reasignacion.empresaId),
      this.causaMovimiento(reasignacion.causaMovimiento),
      this.responsable(reasignacion.responsablePrimario),
      this.responsable(reasignacion.responsableUso),
      this.sede(reasignacion.sede),
      this.activosProceso(reasignacion.activos),
    ];
    return forkJoin(obtenerInformacion).pipe(
      map(
        ([
          empresa,
          causaMovimiento,
          responsablePrimario,
          responsableUso,
          sede,
          activos,
        ]) => ({
          empresaId: empresa,
          id: reasignacion.id,
          comprobante: reasignacion.comprobante.toString().substring(5),
          causaMovimiento: causaMovimiento,
          responsablePrimario: responsablePrimario,
          responsableUso: responsableUso,
          sede: sede,
          fechaEntrega: reasignacion.fechaEntrega,
          observaciones: reasignacion.observaciones,
          activos: activos,
          creado: reasignacion.creado,
          modificado: reasignacion.modificado,
        })
      )
    );
  }

  /** RETORNO */
  private retorno(retorno: Retorno) {
    let obtenerInformacion = [
      this.empresa(retorno.empresaId),
      this.beneficiario(retorno.beneficiario),
      this.activosProceso(retorno.activos),
    ];
    return forkJoin(obtenerInformacion).pipe(
      map(([empresa, beneficiario, activos]) => ({
        empresaId: empresa,
        id: retorno.id,
        comprobante: retorno.comprobante.toString().substring(5),
        beneficiario: beneficiario,
        observaciones: retorno.observaciones,
        activos: activos,
        creado: retorno.creado,
        modificado: retorno.modificado,
      }))
    );
  }

  listaActasPrestamo(actasPrestamo: ActaPrestamo[]) {
    let unidadesCedentes$ = actasPrestamo.map(acta =>
      this.unidadAdministrativa(acta.unidadAdministrativaCedente)
    );
    let responsablesCedentes$ = actasPrestamo.map(acta =>
      this.responsable(acta.unidadCedenteResponsable)
    );
    let unidadesReceptoras$ = actasPrestamo.map(acta =>
      this.unidadAdministrativa(acta.unidadAdministrativaReceptora)
    );
    let responsablesRecepotas$ = actasPrestamo.map(acta =>
      this.responsable(acta.unidadReceptoraResponsable)
    );
    let testigos$ = actasPrestamo.map(acta => this.responsable(acta.testigo));
    let obtenerInformacion$ = [
      ...unidadesCedentes$,
      ...responsablesCedentes$,
      ...unidadesReceptoras$,
      ...responsablesRecepotas$,
      ...testigos$,
    ];
    return forkJoin(obtenerInformacion$).pipe(
      map(informacion => {
        let infoReporte = [];
        let unidadesCedentes = informacion.splice(0, unidadesCedentes$.length);
        let responsablesCedentes = informacion.splice(
          0,
          responsablesCedentes$.length
        );
        let unidadesReceptoras = informacion.splice(
          0,
          unidadesReceptoras$.length
        );
        let responsablesReceptoras = informacion.splice(
          0,
          responsablesRecepotas$.length
        );
        let testigos = informacion.splice(0);
        for (let i = 0; i < unidadesCedentes.length; i++) {
          infoReporte.push({
            fecha: new Date(actasPrestamo[i].creado),
            comprobante: String(actasPrestamo[i].comprobante).substring(5),
            unidadAdministrativaCedente: unidadesCedentes[i],
            responsableCedente: responsablesCedentes[i],
            unidadAdministrativaReceptora: unidadesReceptoras[i],
            responsableReceptora: responsablesReceptoras[i],
            testigo: testigos[i],
            // activos: actasPrestamo[i].activos
            //   .map(activo => activo.codigo.substring(5))
            //   .toString(),
            // notas: actasPrestamo[i].notas,
          });
        }
        return infoReporte;
      })
    );
  }

  listaDepreciaciones(depreciaciones: Depreciacion[]) {
    let buscarActivos$ = depreciaciones.map(depreciacion =>
      this.activo(depreciacion.activo)
    );
    return forkJoin(buscarActivos$).pipe(
      map(activosEncontrados => {
        let infoReporte = [];
        for (let i = 0; i < activosEncontrados.length; i++) {
          infoReporte.push({
            comprobante: String(depreciaciones[i].comprobante).substring(5),
            activo: activosEncontrados[i],
            serial: depreciaciones[i].serial,
            identificador: depreciaciones[i].serial,
            fechaCompra: depreciaciones[i].fechaCompra,
            fechaIncorporacion: depreciaciones[i].fechaIncorporacion,
            metodo: normalizarMetodoDepreciacion(depreciaciones[i].metodo),
            moneda: depreciaciones[i].moneda,
            costo: depreciaciones[i].costo,
            valorRescate: depreciaciones[i].valorRescate.toFixed(2),
            montoDepreciar: depreciaciones[i].montoDepreciar.toFixed(2),
            vidaUtil: depreciaciones[i].vidaUtil,
            depreciacionMensual:
              depreciaciones[i].depreciacionMensual.toFixed(2),
            depreciacionAnual: depreciaciones[i].depreciacionAnual.toFixed(2),
          });
        }
        return infoReporte;
      })
    );
  }
}
