import { switchMap, mergeMap, zipAll } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Activo } from '@core/models/definiciones/activo';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { ActivoDetalleService } from './activo-detalle.service';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivoComponenteService } from './activo-componente.service';
import { ActivoDepreciacionService } from './activo-depreciacion.service';
import { ActivoUbicacionService } from './activo-ubicacion.service';
import { adaptarActivo } from '@core/utils/adaptadores-rxjs.ts/adaptar-activo';

@Injectable({
  providedIn: 'root',
})
export class ActivoService extends GenericService<Activo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activo').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackbar: MatSnackBar,
    private _activoDetalle: ActivoDetalleService,
    private _activoComponente: ActivoComponenteService,
    private _activoDepreciacion: ActivoDepreciacionService,
    private _activoUbicacion: ActivoUbicacionService
  ) {
    super(_http, _sigesp, _snackbar);
  }

  /**
   * @description Obtiene los datos generales de todos los activos.
   * @returns Observable<Activo[]>
   */
  buscarTodos(): Observable<Activo[]> {
    return super.buscarTodos();
  }

  /**
   * @description Obtiene todos los datos de un activo.
   * @param id string | number
   * @returns Observable<Activo>
   */
  buscsarPorId(id: Id): Observable<Activo> {
    return super.buscarPorId(id).pipe(adaptarActivo());
  }

  /**
   * @description almacena todos los datos del activo y retorna un activo con los datos de lista.
   * @param activo Activo
   * @param tipoDato string
   * @param notificar boolean
   * @returns Observable<Activo>
   */
  guardar(
    activo: Activo,
    tipoDato: string,
    notificar: boolean = true
  ): Observable<Activo> {
    return super.guardar(activo, tipoDato, notificar);
  }
}
