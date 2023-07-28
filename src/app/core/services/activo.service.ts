import { switchMap, mergeMap, zipAll, map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
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
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { tipoOracion } from '@core/utils/funciones/tipo-oracion';

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
   * @description Obtiene todos los datos generales de un activo.
   * @param id string | number
   * @returns Observable<Activo>
   */
  buscsarPorId(id: Id): Observable<Activo> {
    return super.buscarPorId(id).pipe(
      switchMap((activo: Activo) =>
        forkJoin([
          this._activoDetalle.buscarPorActivo(activo.id),
          this._activoComponente.buscarPorActivo(activo.id),
          this._activoDepreciacion.buscarPorActivo(activo.id),
          this._activoUbicacion.buscarPorActivo(activo.id),
        ]).pipe(
          map(([detalle, componentes, depreciacion, ubicacion]) => {
            activo.detalle = detalle;
            activo.componentes = componentes;
            activo.depreciacion = depreciacion;
            activo.ubicacion = ubicacion;
            return activo;
          })
        )
      ),
      adaptarActivo()
    );
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
    return super.guardar(activo, tipoDato, notificar).pipe(
      switchMap(activoGuardado => {
        let peticionesGuardar = [];
        if (activo.detalle)
          peticionesGuardar.push(
            this._activoDetalle.guardar(activo.detalle, tipoDato, false)
          );
        if (activo.depreciacion)
          peticionesGuardar.push(
            this._activoDepreciacion.guardar(
              activo.depreciacion,
              tipoDato,
              false
            )
          );
        if (activo.ubicacion)
          peticionesGuardar.push(
            this._activoUbicacion.guardar(activo.ubicacion, tipoDato, false)
          );

        return forkJoin(peticionesGuardar).pipe(
          map(respuestas => {
            if (activoGuardado.detalle) {
              activoGuardado.detalle = respuestas.shift() as ActivoDetalle;
            }
            if (activoGuardado.depreciacion) {
              activoGuardado.depreciacion =
                respuestas.shift() as ActivoDepreciacion;
            }
            if (activoGuardado.ubicacion) {
              activoGuardado.ubicacion = respuestas.shift() as ActivoUbicacion;
            }
            if (notificar) {
              this.snackBarMessage(
                `${tipoOracion(tipoDato)} "${activoGuardado.codigo}-${
                  activoGuardado.denominacion
                }", guardado correctamente`
              );
            }
            return activoGuardado;
          })
        );
      })
    );
  }
}
