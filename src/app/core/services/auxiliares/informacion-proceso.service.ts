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

@Injectable({
  providedIn: 'root',
})
export class InformacionProcesoService {
  constructor(
    private _empresa: EmpresaService,
    private _causaMovimiento: CausaMovimientoService,
    private _responsable: ResponsableService,
    private _unidadAdministrativa: UnidadAdministrativaService,
    private _sede: SedeService
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
        break;
      case 'CAMBIO DE RESPONSABLE':
        break;
      case 'AUTORIZACIÓN DE SALIDA':
        break;
      case 'DEPRECIACIÓN':
        break;
      case 'DESINCORPORACIÓN':
        break;
      case 'ENTREGA DE UNIDAD':
        break;
      case 'INCORPORACIÓN':
        resultado = this.informacionIncorporacion(proceso);
        break;
      case 'MODIFICACIÓN':
        break;
      case 'REASIGNACIÓN':
        break;
      case 'RETORNO DE ACTIVO':
        break;
    }
    return resultado; // Devuelve el resultado obtenido
  }

  /**
   * Obtiene la denominación de una entidad a partir de su ID.
   * @param servicio Servicio de entidad (puede ser EmpresaService, CausaMovimientoService, etc.).
   * @param entidadId ID de la entidad.
   * @returns Un observable con la denominación de la entidad.
   */
  private denominacionEntidad(servicio: any, entidadId: Id): Observable<any> {
    return servicio
      .buscarPorId(entidadId)
      .pipe(map((entidad: any) => entidad.denominacion));
  }

  // Funciones para obtener denominaciones de diferentes entidades
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

  /**
   * Obtiene información detallada de una incorporación según su ID.
   * @param id ID de la incorporación.
   * @returns Un observable con la información detallada de la incorporación.
   */
  private informacionIncorporacion(
    incorporacion: Incorporacion
  ): Observable<any> {
    // Obtener denominaciones de entidades relacionadas
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
}
