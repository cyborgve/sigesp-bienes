import { switchMap, map, tap, take, first } from 'rxjs/operators';
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
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

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
      switchMap(activo => {
        let buscarComplementos = [
          this._activoDetalle.buscarPorActivo(id),
          this._activoDepreciacion.buscarPorActivo(id),
          this._activoUbicacion.buscarPorActivo(id),
        ];
        return forkJoin(buscarComplementos).pipe(
          map(([detalle, depreciacion, ubicacion]) => {
            let activoCompleto: Activo = {
              ...activo,
              detalle: detalle as ActivoDetalle,
              depreciacion: depreciacion as ActivoDepreciacion,
              ubicacion: ubicacion as ActivoUbicacion,
            };
            return activoCompleto;
          })
        );
      }),
      tap(activo => console.log(activo)),
      take(1)
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
        activoIn.detalle.activoId = activoGuardado.Id;
        console.log(['detalle', activoIn.detalle]);
        activoIn.depreciacion.activoId = activoGuardado.Id;
        activoIn.ubicacion.activoId = activoGuardado.id;
        let complementosGuardar = [
          this._activoDetalle.guardar(activoIn.detalle, '', false).pipe(
            map((res: any) => res.data[0]),
            map(res => normalizarObjeto(res))
          ),
        ];
        return forkJoin(complementosGuardar).pipe(
          map(([detalle]) => {
            return { ...activoGuardado, detalle: detalle };
          })
        );
      }),
      tap(activo => console.log(activo)),
      first()
    );
    // return super.guardar(activo, tipoDato, false).pipe(
    //   map((respuesta: any) => respuesta.data[0]),
    //   map(valor => (valor ? normalizarObjeto(valor) : valor)),
    //   tap(activo => console.log(activo)),
    //   switchMap((activoGuardado: Activo) => {
    //     activo.detalle.activoId = Number(activoGuardado.id);
    //     activo.depreciacion.activoId = Number(activoGuardado.id);
    //     activo.ubicacion.activoId = Number(activoGuardado.id);
    //     let peticionesGuardar = [
    //       this._activoDetalle.guardar(activo.detalle, tipoDato, false).pipe(
    //         map((resultado: any) => resultado.data[0]),
    //         map(objeto => normalizarObjeto(objeto))
    //       ),
    //       this._activoDepreciacion
    //         .guardar(activo.depreciacion, tipoDato, false)
    //         .pipe(
    //           map((resultado: any) => resultado.data[0]),
    //           map(objeto => normalizarObjeto(objeto))
    //         ),
    //       this._activoUbicacion.guardar(activo.ubicacion, tipoDato, false).pipe(
    //         map((resultado: any) => resultado.data[0]),
    //         map(objeto => normalizarObjeto(objeto))
    //       ),
    //     ];
    //     return forkJoin(peticionesGuardar).pipe(
    //       map(([detalle, depreciacion, ubicacion]) => {
    //         activoGuardado.detalle = detalle as ActivoDetalle;
    //         activoGuardado.depreciacion = depreciacion as ActivoDepreciacion;
    //         activoGuardado.ubicacion = ubicacion as ActivoUbicacion;
    //         this.snackBarMessage(
    //           `${tipoOracion(tipoDato)} "${activoGuardado.codigo}-${
    //             activoGuardado.denominacion
    //           }", guardado correctamente`
    //         );
    //         return activoGuardado;
    //       })
    //     );
    //   }),
    //   take(1)
  }

  actualizar(id: Id, entidad: Activo, tipoDato: string): Observable<Number> {
    return super.actualizar(id, entidad, tipoDato, false).pipe(
      tap((respuesta: any) => {
        if (respuesta.data > 0) {
          this.snackBarMessage(
            `${tipoOracion(tipoDato)}: "${
              String(entidad.codigo).split('-')[1]
            }-${entidad.denominacion}", actualizado correctamente`
          );
        }
      }),
      take(1)
    );
  }
}
