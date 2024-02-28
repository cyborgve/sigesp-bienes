import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { Integracion } from '@core/models/procesos/integracion';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import {
  adaptarIntegracion,
  adaptarIntegraciones,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-integracion';
import { ActivoService } from '../definiciones/activo.service';
import { UnidadAdministrativaService } from '../definiciones/unidad-administrativa.service';
import { ContabilizacionService } from '../otros-modulos/contabilidad.service';
import { aprobarIntegraciones } from '@core/utils/pipes-rxjs/procesos/aprobar-integraciones';
import { reversarAprobarIntegraciones } from '@core/utils/pipes-rxjs/procesos/reversar-aprobar-integraciones';
import { prepararIntegracion } from '@core/utils/funciones/preparar-integracion';
import { contabilizarDepreciacionesMensuales } from '@core/utils/pipes-rxjs/procesos/contabilizar-depreciaciones-mensuales';
import { DepreciacionService } from './depreciacion.service';
import { reversarContabilizarDepreciacionesMensuales } from '@core/utils/pipes-rxjs/procesos/reversar-contabilizar-depreciacion';
import { contabilizarDesincorporaciones } from '@core/utils/pipes-rxjs/procesos/contabilizar-desincorporaciones';
import { DesincorporacionService } from './desincorporacion.service';
import { reversarContabilizarDesincorporaciones } from '@core/utils/pipes-rxjs/procesos/reversar-contabilizar-desincorporacion';
import { ModificacionService } from './modificacion.service';
import { contabilizarModificaciones } from '@core/utils/pipes-rxjs/procesos/contabilizar-modificaciones';
import { reversarContabilizarModificaciones } from '@core/utils/pipes-rxjs/procesos/reversar-contabilizar-modificacion';

@Injectable({
  providedIn: 'root',
})
export class IntegracionService extends GenericService<Integracion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'integracion').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _activo: ActivoService,
    private _unidadAdministrativa: UnidadAdministrativaService,
    private _depreciacion: DepreciacionService,
    private _contabilizacion: ContabilizacionService,
    private _desincorporacion: DesincorporacionService,
    private _modificacion: ModificacionService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Integracion[]> {
    return this._http.get<any>(this.apiUrl).pipe(
      map((respuesta: any) => respuesta.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarIntegraciones()
    );
  }

  buscarPorId(id: Id): Observable<Integracion> {
    return super.buscarPorId(id).pipe(adaptarIntegracion());
  }

  guardar(
    entidad: Integracion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Integracion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarIntegracion());
  }

  procesar(integraciones: Integracion[], notificar?: boolean): Observable<any> {
    return of(integraciones).pipe(
      aprobarIntegraciones(this, this._snackBar, true),
      reversarAprobarIntegraciones(this, this._snackBar, true)
    );
  }

  procesarAprobaciones(
    integraciones: Integracion[],
    notificar?: boolean
  ): Observable<Integracion[]> {
    return of(integraciones).pipe(
      map(ints => ints.map(prepararIntegracion)),
      aprobarIntegraciones(this, this._snackBar, notificar)
    );
  }

  procesarReversarAprobaciones(
    integraciones: Integracion[],
    notificar?: boolean
  ): Observable<Integracion[]> {
    return of(integraciones).pipe(
      map(ints => ints.map(prepararIntegracion)),
      reversarAprobarIntegraciones(this, this._snackBar, notificar)
    );
  }

  procesarDepreciaciones(
    integraciones: Integracion[],
    lineaEmpresa: Id,
    fechaIntegraciones: Date,
    observaciones: string,
    notificar?: boolean
  ): Observable<Integracion[]> {
    return of(integraciones).pipe(
      contabilizarDepreciacionesMensuales(
        lineaEmpresa,
        fechaIntegraciones,
        observaciones,
        this._activo,
        this._unidadAdministrativa,
        this._depreciacion,
        this._contabilizacion,
        this,
        this._snackBar,
        notificar
      )
    );
  }

  procesarReversarDepreciaciones(
    integraciones: Integracion[],
    lineaEmpresa: Id,
    fechaIntegraciones: Date,
    observaciones: string,
    notificar?: boolean
  ): Observable<Integracion[]> {
    return of(integraciones).pipe(
      reversarContabilizarDepreciacionesMensuales(
        lineaEmpresa,
        fechaIntegraciones,
        observaciones,
        this._activo,
        this._unidadAdministrativa,
        this._depreciacion,
        this._contabilizacion,
        this,
        this._snackBar,
        notificar
      )
    );
  }

  procesarDesincorporaciones(
    integraciones: Integracion[],
    lineaEmpresa: Id,
    fechaIntegraciones: Date,
    observaciones: string,
    notificar?: boolean
  ): Observable<Integracion[]> {
    return of(integraciones).pipe(
      map(ints => ints.map(prepararIntegracion)),
      contabilizarDesincorporaciones(
        lineaEmpresa,
        fechaIntegraciones,
        observaciones,
        this._activo,
        this._unidadAdministrativa,
        this._desincorporacion,
        this._contabilizacion,
        this,
        this._snackBar,
        true
      )
    );
  }

  procesarReversarDesincorporaciones(
    integraciones: Integracion[],
    lineaEmpresa: Id,
    fechaIntegraciones: Date,
    observaciones: string,
    notificar?: boolean
  ): Observable<Integracion[]> {
    return of(integraciones).pipe(
      map(ints => ints.map(prepararIntegracion)),
      reversarContabilizarDesincorporaciones(
        lineaEmpresa,
        fechaIntegraciones,
        observaciones,
        this._activo,
        this._unidadAdministrativa,
        this._desincorporacion,
        this._contabilizacion,
        this,
        this._snackBar,
        true
      )
    );
  }

  procesarModificaciones(
    integraciones: Integracion[],
    lineaEmpresa: Id,
    fechaIntegraciones: Date,
    observaciones: string,
    notificar?: boolean
  ): Observable<Integracion[]> {
    return of(integraciones).pipe(
      map(ints => ints.map(prepararIntegracion)),
      contabilizarModificaciones(
        lineaEmpresa,
        fechaIntegraciones,
        observaciones,
        this._activo,
        this._unidadAdministrativa,
        this._modificacion,
        this._contabilizacion,
        this,
        this._snackBar,
        true
      )
    );
  }

  procesarReversarModificaciones(
    integraciones: Integracion[],
    lineaEmpresa: Id,
    fechaIntegraciones: Date,
    observaciones: string,
    notificar?: boolean
  ): Observable<Integracion[]> {
    return of(integraciones).pipe(
      map(ints => ints.map(prepararIntegracion)),
      reversarContabilizarModificaciones(
        lineaEmpresa,
        fechaIntegraciones,
        observaciones,
        this._activo,
        this._unidadAdministrativa,
        this._modificacion,
        this._contabilizacion,
        this,
        this._snackBar,
        true
      )
    );
  }
}
