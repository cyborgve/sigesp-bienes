import { switchMap, map, tap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
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
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { prepararActivoDetalle } from '@core/utils/funciones/preparar-activo-detalle';
import { prepararActivoDepreciacion } from '@core/utils/funciones/preparar-activo-depreciacion';
import { prepararActivoUbicacion } from '@core/utils/funciones/preparar-activo-ubicacion';
import { adaptarActivo } from '@core/utils/adaptadores-rxjs.ts/adaptar-activo';
import { adaptarActivoDetalle } from '@core/utils/adaptadores-rxjs.ts/adaptar-activo-detalle';
import { adaptarActivoDepreciacion } from '@core/utils/adaptadores-rxjs.ts/adaptar-activo-depreciacion';
import { adaptarActivoUbicacion } from '@core/utils/adaptadores-rxjs.ts/adaptar-activo-ubicacion';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { adaptarComponentes } from '@core/utils/adaptadores-rxjs.ts/adaptar-componentes';

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
  buscarPorId(id: Id): Observable<Activo> {
    return super.buscarPorId(id).pipe(
      adaptarActivo(),
      switchMap(activo => {
        let buscarComplementos = [
          this._activoDetalle
            .buscarPorActivo(activo.id)
            .pipe(adaptarActivoDetalle()),
          this._activoDepreciacion
            .buscarPorActivo(activo.id)
            .pipe(adaptarActivoDepreciacion()),
          this._activoUbicacion
            .buscarPorActivo(activo.id)
            .pipe(adaptarActivoUbicacion()),
          this._activoComponente
            .buscarPorActivo(activo.id)
            .pipe(adaptarComponentes()),
        ];
        return forkJoin(buscarComplementos).pipe(
          map(([detalle, depreciacion, ubicacion, componentes]) => {
            let activoCompleto: Activo = {
              ...activo,
              detalle: detalle as ActivoDetalle,
              depreciacion: depreciacion as ActivoDepreciacion,
              ubicacion: ubicacion as ActivoUbicacion,
              componentes: componentes as ActivoComponente[],
            };
            return activoCompleto;
          })
        );
      })
    );
  }

  /**
   * @description almacena todos los datos del activo y retorna un activo con los datos de lista.
   * @param activo Activo
   * @param tipoDato string
   * @param notificar boolean
   * @returns Observable<Activo>
   */
  guardar(activoIn: Activo, tipoDato: string): Observable<Activo> {
    return super.guardar(activoIn, tipoDato).pipe(
      map((res: any) => res.data[0]),
      map(res => normalizarObjeto(res)),
      switchMap((activoGuardado: any) => {
        let detalle = prepararActivoDetalle(activoIn.detalle);
        let depreciacion = prepararActivoDepreciacion(activoIn.depreciacion);
        let ubicacion = prepararActivoUbicacion(activoIn.ubicacion);
        detalle.activoId = Number(activoGuardado.id);
        depreciacion.activoId = Number(activoGuardado.id);
        ubicacion.activoId = Number(activoGuardado.id);
        let complementosGuardar = [
          this._activoDetalle.guardar(detalle, '', false).pipe(
            map((res: any) => res.data[0]),
            map(res => normalizarObjeto(res))
          ),
          this._activoDepreciacion.guardar(depreciacion, '', false).pipe(
            map((res: any) => res.data[0]),
            map(res => normalizarObjeto(res))
          ),
          this._activoUbicacion.guardar(ubicacion, '', false).pipe(
            map((res: any) => res.data[0]),
            map(res => normalizarObjeto(res))
          ),
        ];
        return forkJoin(complementosGuardar).pipe(
          map(([detalle, depreciacion, ubicacion]) => {
            return {
              ...activoGuardado,
              detalle: detalle,
              depreciacion: depreciacion,
              ubicacion: ubicacion,
            };
          })
        );
      })
    );
  }

  /**
   * @description actualiza todos los datos que pueden ser reasignados del activo
   * @param id number
   * @param activo Activo
   * @param tipoDato string
   * @returns 1 | 0 (verdadero o falso) si se ejecuto la actualizacion.
   */
  actualizar(id: Id, activo: Activo, tipoDato: string): Observable<Number> {
    let peticionesActualizar = [
      super.actualizar(id, activo, tipoDato),
      this._activoDetalle.actualizar(id, activo.detalle, '', false),
      this._activoDepreciacion.actualizar(id, activo.depreciacion, '', false),
      this._activoUbicacion.actualizar(id, activo.ubicacion, '', false),
    ];
    return forkJoin(peticionesActualizar).pipe(
      map(([act, det, dep, ubi]) => {
        if (
          Number(act) > 0 &&
          Number(det) > 0 &&
          Number(dep) > 0 &&
          Number(ubi) > 0
        )
          return 1;
        else return 0;
      })
    );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    let peticionesEliminar = [
      super.eliminar(id, tipoDato, notificar),
      this._activoDetalle.eliminarPorActivo(id, '', false),
      this._activoDepreciacion.eliminarPorActivo(id, '', false),
      this._activoUbicacion.eliminarPorActivo(id, '', false),
    ];
    return forkJoin(peticionesEliminar).pipe(
      map(([activo, detalle, depreciacion, ubicacion]) => {
        if (activo && detalle && depreciacion && ubicacion) return true;
        else false;
      })
    );
  }
}
