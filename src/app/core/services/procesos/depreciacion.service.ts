import { adaptarDepreciacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-depreciacion';
import { adaptarDepreciaciones } from '@core/utils/pipes-rxjs/adaptadores/adaptar-depreciacion';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { END_POINTS } from '@core/constants/end-points';
import { Observable, forkJoin } from 'rxjs';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepreciacionDetalleService } from './depreciacion-detalle.service';
import { DepreciacionLista } from '@core/models/auxiliares/depreciacion-lista';
import { adaptarDepreciacionesLista } from '@core/utils/pipes-rxjs/adaptadores/adaptar-depreciacion-lista';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';
import { adaptarDepreciacionesMensuales } from '@core/utils/pipes-rxjs/adaptadores/adaptar-depreciacion-mensual';

@Injectable({
  providedIn: 'root',
})
export class DepreciacionService extends GenericService<Depreciacion> {
  private apiUrlActivo = (activo: Id) => `${this.apiUrl}?activo=${activo}`;
  private apiUrlLista = () => `${this.apiUrl}?lista=${'lista'}`;
  private apiUrlMensuales = () => `${this.apiUrl}?mensuales=${'mensuales'}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'depreciacion').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _detalleDepreciacion: DepreciacionDetalleService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Depreciacion[]> {
    return super.buscarTodos().pipe(adaptarDepreciaciones());
  }

  buscarTodosLista(): Observable<DepreciacionLista[]> {
    return this._http.get<any>(this.apiUrlLista()).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarDepreciacionesLista()
    );
  }

  buscarTodosMensuales(): Observable<ActivoListaDepreciacion[]> {
    return this._http.get<any>(this.apiUrlMensuales()).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarDepreciacionesMensuales()
    );
  }

  buscarPorActivo(activo: Id): Observable<Depreciacion> {
    return this._http.get<Depreciacion[]>(this.apiUrlActivo(activo)).pipe(
      map((resultado: any) => resultado.data),
      map(data => normalizarObjeto(data[0])),
      adaptarDepreciacion(),
      switchMap(depreciacion =>
        this._detalleDepreciacion.buscarTodosPorProceso(depreciacion.id).pipe(
          map(detallesDepreciacion => {
            depreciacion.detalles = detallesDepreciacion;
            return depreciacion;
          })
        )
      )
    );
  }

  buscarPorId(id: Id): Observable<Depreciacion> {
    return super.buscarPorId(id).pipe(
      adaptarDepreciacion(),
      switchMap(depreciacion =>
        this._detalleDepreciacion.buscarTodosPorProceso(depreciacion.id).pipe(
          map(detallesDepreciacion => {
            depreciacion.detalles = detallesDepreciacion;
            return depreciacion;
          })
        )
      )
    );
  }

  guardar(
    entidad: Depreciacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Depreciacion> {
    return super.guardar(entidad, tipoDato, notificar).pipe(
      adaptarDepreciacion(),
      switchMap(depreciacion => {
        let guardarDetalles = entidad.detalles
          .map(detalleDepreciacion => {
            detalleDepreciacion.proceso = depreciacion.id;
            return detalleDepreciacion;
          })
          .map(detalleDepreciacion =>
            this._detalleDepreciacion.guardar(
              detalleDepreciacion,
              undefined,
              false
            )
          );
        return forkJoin(guardarDetalles).pipe(
          map(detallesDepreciacion => {
            depreciacion.detalles = detallesDepreciacion;
            return depreciacion;
          })
        );
      })
    );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(depreciacion =>
        super.eliminar(id, tipoDato, notificar).pipe(
          map(eliminada => (eliminada ? depreciacion : eliminada)),
          map(depreciacion => !!depreciacion)
        )
      )
    );
  }
}
