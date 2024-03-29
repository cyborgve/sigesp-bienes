import { switchMap, map, tap } from 'rxjs/operators';
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
import { generarIncorporacionAutomatica } from '@core/utils/pipes-rxjs/procesos/generar-incorporacion-automatica';
import { generarDepreciacionAutomatica } from '@core/utils/pipes-rxjs/procesos/generar-depreciacion-automatica';
import { IncorporacionService } from '../procesos/incorporacion.service';
import { DepreciacionService } from '../procesos/depreciacion.service';
import { ActivoIntegracionService } from './activo-integracion.service';
import { ActivoIntegracion } from '@core/models/definiciones/activo-integracion';
import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';
import { adaptarActivosListaRetorno } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-lista-retorno';

@Injectable({
  providedIn: 'root',
})
export class ActivoService extends GenericService<Activo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activo').valor;
  }

  private apiUrlLista = () => `${this.apiUrl}?lista=${'lista'}`;
  private apiUrlInventario = () => `${this.apiUrl}?inventario=${'inventario'}`;
  private apiUrlRetornos = () => `${this.apiUrl}?retornos=${'retornos'}`;

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackbar: MatSnackBar,
    private _activoDetalle: ActivoDetalleService,
    private _activoComponente: ActivoComponenteService,
    private _activoDepreciacion: ActivoDepreciacionService,
    private _activoUbicacion: ActivoUbicacionService,
    private _activoIntegracion: ActivoIntegracionService,
    private _incorporacion: IncorporacionService,
    private _depreciacion: DepreciacionService
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
          this._activoIntegracion.buscarPorActivo(activo.id),
        ];
        return forkJoin(buscarComplementos).pipe(
          map(
            ([detalle, depreciacion, ubicacion, componentes, integracion]) => {
              let activoCompleto: Activo = {
                ...activo,
                detalle: detalle as ActivoDetalle,
                depreciacion: depreciacion as ActivoDepreciacion,
                ubicacion: ubicacion as ActivoUbicacion,
                componentes: componentes as ActivoComponente[],
                integracion: integracion as ActivoIntegracion,
              };
              activoCompleto;
              return activoCompleto;
            }
          )
        );
      })
    );
  }

  guardar(
    activoIn: Activo,
    tipoDato: string,
    notificar?: boolean,
    opciones?: {
      generarIncorporacion?: boolean;
      generarDepreciacion?: boolean;
      causaMovimiento?: Id;
    }
  ): Observable<Activo> {
    return super.guardar(activoIn, tipoDato, notificar).pipe(
      adaptarActivo(),
      switchMap((activoGuardado: any) => {
        let detalle = prepararActivoDetalle(activoIn.detalle);
        let depreciacion = prepararActivoDepreciacion(activoIn.depreciacion);
        let ubicacion = prepararActivoUbicacion(activoIn.ubicacion);
        let integracion = activoIn.integracion;
        detalle.activoId = Number(activoGuardado.id);
        depreciacion.activoId = Number(activoGuardado.id);
        ubicacion.activoId = Number(activoGuardado.id);
        integracion.activoId = Number(activoGuardado.id);
        let guardarComplementos = [
          this._activoDetalle.guardar(detalle, undefined, false),
          this._activoDepreciacion.guardar(depreciacion, undefined, false),
          this._activoUbicacion.guardar(ubicacion, undefined, false),
          this._activoIntegracion.guardar(integracion, undefined, false),
        ];
        return forkJoin(guardarComplementos).pipe(
          map(([detalle, depreciacion, ubicacion, integracion]) => {
            return {
              ...activoGuardado,
              detalle: detalle,
              depreciacion: depreciacion,
              ubicacion: ubicacion,
              integracion: integracion,
            };
          })
        );
      }),
      generarIncorporacionAutomatica(
        opciones.generarIncorporacion,
        opciones.causaMovimiento,
        this._incorporacion
      ),
      generarDepreciacionAutomatica(
        opciones.generarDepreciacion,
        this._depreciacion
      )
    );
  }

  actualizar(id: Id, activo: Activo, tipoDato: string): Observable<number> {
    let peticionesActualizar = [
      super.actualizar(id, activo, tipoDato),
      this._activoDetalle.actualizar(id, activo.detalle, '', false),
      this._activoDepreciacion.actualizar(id, activo.depreciacion, '', false),
      this._activoUbicacion.actualizar(id, activo.ubicacion, '', false),
      this._activoIntegracion.actualizar(id, activo.integracion, '', false),
    ];
    return forkJoin(peticionesActualizar).pipe(
      map(([act, det, dep, ubi, int]) => {
        if (
          Number(act) > 0 &&
          Number(det) > 0 &&
          Number(dep) > 0 &&
          Number(ubi) > 0 &&
          Number(int) > 0
        )
          return 1;
        else return 0;
      })
    );
  }

  buscarTodosLista(): Observable<ActivoLista[]> {
    return this._http.get<any[]>(this.apiUrlLista()).pipe(
      map((resultado: any) => resultado.data),
      map((lista: any[]) => lista.map(normalizarObjeto)),
      adaptarActivosLista()
    );
  }

  buscarTodosInventario(): Observable<ActivoListaInventario[]> {
    return this._http.get<any[]>(this.apiUrlInventario()).pipe(
      map((resultado: any) => resultado.data),
      map((inventario: any[]) => inventario.map(normalizarObjeto)),
      adaptarActivosInventario(),
      map(activos => activos.sort((a, b) => (a.codigo > b.codigo ? 1 : -1)))
    );
  }

  buscarTodosRetornos(): Observable<ActivoListaRetorno[]> {
    return this._http.get<any[]>(this.apiUrlRetornos()).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarActivosListaRetorno()
    );
  }
}
