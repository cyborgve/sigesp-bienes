import { switchMap, map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
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
import { prepararActivoDetalle } from '@core/utils/funciones/preparar-activo-detalle';
import { prepararActivoDepreciacion } from '@core/utils/funciones/preparar-activo-depreciacion';
import { prepararActivoUbicacion } from '@core/utils/funciones/preparar-activo-ubicacion';
import { adaptarActivo } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { adaptarActivos } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarActivosLista } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-lista';
import { ActivoLista } from '@core/models/auxiliares/activo-lista';
import { ActivoListaInventario } from '@core/models/auxiliares/activo-lista-inventario';
import { adaptarActivosInventario } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-inventario';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';
import { generarIncorporacionAutomatica } from '@core/utils/pipes-rxjs/procesos/generar-incorporacion-automatica';
import { generarDepreciacionAutomatica } from '@core/utils/pipes-rxjs/procesos/generar-depreciacion-automatica';

@Injectable({
  providedIn: 'root',
})
export class ActivoService extends GenericService<Activo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activo').valor;
  }

  private apiUrlLista = () => `${this.apiUrl}?lista=${'lista'}`;
  private apiUrlInventario = () => `${this.apiUrl}?inventario=${'inventario'}`;

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

  buscarTodos(): Observable<Activo[]> {
    return super.buscarTodos().pipe(adaptarActivos());
  }

  buscarPorId(id: Id): Observable<Activo> {
    return super.buscarPorId(id).pipe(
      adaptarActivo(),
      switchMap(activo => {
        let buscarComplementos = [
          this._activoDetalle.buscarPorActivo(activo.id),
          this._activoDepreciacion.buscarPorActivo(activo.id),
          this._activoUbicacion.buscarPorActivo(activo.id),
          this._activoComponente.buscarPorActivo(activo.id),
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

  guardar(activoIn: Activo, tipoDato: string): Observable<Activo> {
    return super.guardar(activoIn, tipoDato).pipe(
      adaptarActivo(),
      switchMap((activoGuardado: any) => {
        let detalle = prepararActivoDetalle(activoIn.detalle);
        let depreciacion = prepararActivoDepreciacion(activoIn.depreciacion);
        let ubicacion = prepararActivoUbicacion(activoIn.ubicacion);
        detalle.activoId = Number(activoGuardado.id);
        depreciacion.activoId = Number(activoGuardado.id);
        ubicacion.activoId = Number(activoGuardado.id);
        let complementosGuardar = [
          this._activoDetalle.guardar(detalle, undefined, false),
          this._activoDepreciacion.guardar(depreciacion, undefined, false),
          this._activoUbicacion.guardar(ubicacion, undefined, false),
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
      }),
      generarIncorporacionAutomatica(),
      generarDepreciacionAutomatica()
    );
  }

  actualizar(id: Id, activo: Activo, tipoDato: string): Observable<number> {
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

  buscarTodosLista(): Observable<ActivoLista[]> {
    return this._http.get<any[]>(this.apiUrlLista()).pipe(
      map((resultado: any) => resultado.data),
      map((lista: any[]) => lista.map(item => normalizarObjeto(item))),
      adaptarActivosLista()
    );
  }

  buscarTodosInventario(): Observable<ActivoListaInventario[]> {
    return this._http.get<any[]>(this.apiUrlInventario()).pipe(
      map((resultado: any) => resultado.data),
      map((inventario: any[]) =>
        inventario.map(activo => normalizarObjeto(activo))
      ),
      adaptarActivosInventario(),
      map(activos => activos.sort((a, b) => (a.codigo > b.codigo ? 1 : -1)))
    );
  }
}
