import { switchMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Desincorporacion } from '@core/models/procesos/desincorporacion';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesincorporacionActivoService } from './desincorporacion-activo.service';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';
import { Observable, forkJoin } from 'rxjs';
import { adaptarDesincorporaciones } from '@core/utils/adaptadores-rxjs/adaptar-desincorporacione';
import { Id } from '@core/types/id';
import { adaptarDesincorporacion } from '@core/utils/adaptadores-rxjs/adaptar-desincorporacion';

@Injectable({
  providedIn: 'root',
})
export class DesincorporacionService extends GenericService<Desincorporacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'desincorporacion').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _desincorporacionActivo: DesincorporacionActivoService,
    private _activoUbicacion: ActivoUbicacionService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Desincorporacion[]> {
    return super.buscarTodos().pipe(adaptarDesincorporaciones());
  }

  buscarPorId(id: Id): Observable<Desincorporacion> {
    return super.buscarPorId(id).pipe(
      adaptarDesincorporacion(),
      switchMap(desincorporacion => {
        let buscarActivos = this._desincorporacionActivo.buscarTodosPorProceso(
          desincorporacion.id
        );
        return forkJoin([buscarActivos]).pipe(
          map(([activosProceso]) => {
            desincorporacion.activos = activosProceso;
            return desincorporacion;
          })
        );
      })
    );
  }

  guardar(
    entidad: Desincorporacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Desincorporacion> {
    return super.guardar(entidad, tipoDato, notificar).pipe(
      adaptarDesincorporacion(),
      switchMap(desincorporacion => {
        let guardarActivos = entidad.activos.map(activo => {
          activo.proceso = desincorporacion.id;
          this._desincorporacionActivo.guardar(activo, undefined, false);
        });
        return forkJoin(guardarActivos).pipe(
          map(activos => {
            desincorporacion.activos = activos;
            return desincorporacion;
          })
        );
      }),
      tap(console.log)
    );
  }
}
