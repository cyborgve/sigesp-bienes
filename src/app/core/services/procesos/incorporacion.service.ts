import { switchMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { END_POINTS } from '@core/constants/end-points';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { IncorporacionActivoService } from './incorporacion-activo.service';
import { Observable, forkJoin } from 'rxjs';
import { adaptarIncorporaciones } from '@core/utils/pipes-rxjs/adaptadores/adaptar-incorporacion';
import { Id } from '@core/types/id';
import { adaptarIncorporacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-incorporacion';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';
import { ejecutarIncorporacion } from '@core/utils/pipes-rxjs/procesos/ejecutar-incorporacion';
import { reversarIncorporacion } from '@core/utils/pipes-rxjs/procesos/reversar-incorporacion';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';

@Injectable({
  providedIn: 'root',
})
export class IncorporacionService extends GenericService<Incorporacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'incorporacion').valor;
  }

  private apiUrlPendientes = `${this.apiUrl}?pendientes=${'pendientes'}`;

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _incorporacionActivo: IncorporacionActivoService,
    private _activoUbicacion: ActivoUbicacionService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Incorporacion[]> {
    return super.buscarTodos().pipe(adaptarIncorporaciones());
  }

  buscarPendientesPorRegistrar(): Observable<Incorporacion[]> {
    return this._http.get<any>(this.apiUrlPendientes).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarIncorporaciones(),
      map(incorporaciones =>
        incorporaciones.map(inco => {
          inco.activos = transformarActivos(inco.activos);
          return inco;
        })
      )
    );
  }

  buscarPorId(id: Id): Observable<Incorporacion> {
    return super.buscarPorId(id).pipe(
      adaptarIncorporacion(),
      switchMap(incorporacion =>
        this._incorporacionActivo.buscarTodosPorProceso(incorporacion.id).pipe(
          map(activos => {
            incorporacion.activos = activos;
            return incorporacion;
          })
        )
      )
    );
  }

  guardar(
    incorporacion: Incorporacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Incorporacion> {
    return super.guardar(incorporacion, tipoDato, notificar).pipe(
      adaptarIncorporacion(),
      switchMap(incorporacionGuardada => {
        let guardarActivos = incorporacion.activos
          .map(activo => {
            activo.proceso = incorporacionGuardada.id;
            return activo;
          })
          .map(activo =>
            this._incorporacionActivo.guardar(activo, undefined, false)
          );
        return forkJoin(guardarActivos).pipe(
          map(activos => {
            incorporacionGuardada.activos = activos;
            return incorporacionGuardada;
          })
        );
      }),
      ejecutarIncorporacion(this._activoUbicacion)
    );
  }

  actualizar(
    id: Id,
    entidad: Incorporacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<number> {
    return super.actualizar(id, entidad, tipoDato, notificar);
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(incorporacion => {
        return super.eliminar(id, tipoDato, notificar).pipe(
          map(incorporacionEliminada =>
            incorporacionEliminada ? incorporacion : incorporacionEliminada
          ),
          reversarIncorporacion(this._activoUbicacion),
          map(incorporacion => !!incorporacion)
        );
      })
    );
  }
}

const transformarActivos = (activos: any) => {
  let entrada = String(activos).split(',');
  let salida: ActivoProceso[] = [];
  salida.push({
    empresaId: Number(entrada[0]),
    id: Number(entrada[1]),
    proceso: Number(entrada[2]),
    activo: Number(entrada[3]),
    tipoActivo: <any>entrada[4],
    codigo: entrada[5],
    denominacion: entrada[6],
    creado: new Date(entrada[7]),
    modificado: new Date(entrada[8]),
  });
  return salida;
};
