import { switchMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Reasignacion } from '@core/models/procesos/reasignacion';
import { END_POINTS } from '@core/constants/end-points';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PDFService } from '../auxiliares/pdf.service';
import { ReasignacionActivoService } from './reasignacion-activo.service';
import { Observable, forkJoin } from 'rxjs';
import { adaptarReasignaciones } from '@core/utils/adaptadores-rxjs/adaptar-reasignaciones';
import { Id } from '@core/types/id';
import { adaptarReasignacion } from '@core/utils/adaptadores-rxjs/adaptar-reasignacion';

@Injectable({
  providedIn: 'root',
})
export class ReasignacionService extends GenericService<Reasignacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'reasignacion').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _reasignacionActivo: ReasignacionActivoService,
    private _pdf: PDFService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Reasignacion[]> {
    return super.buscarTodos().pipe(adaptarReasignaciones());
  }

  buscarPorId(id: Id): Observable<Reasignacion> {
    return super.buscarPorId(id).pipe(
      adaptarReasignacion(),
      switchMap(reasignacion =>
        this._reasignacionActivo.buscarTodosPorProceso(reasignacion.id).pipe(
          map(activos => {
            reasignacion.activos = activos;
            return reasignacion;
          })
        )
      )
    );
  }

  guardar(
    entidad: Reasignacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Reasignacion> {
    return super.guardar(entidad, tipoDato, notificar).pipe(
      adaptarReasignacion(),
      switchMap(reasignacionGuardada => {
        let guardarActivos = entidad.activos.map(activo => {
          activo.proceso = reasignacionGuardada.id;
          return this._reasignacionActivo.guardar(activo, undefined, false);
        });
        return forkJoin(guardarActivos).pipe(
          map(activosGuardados => {
            reasignacionGuardada.activos = activosGuardados;
            return reasignacionGuardada;
          })
        );
      }),
      tap(reasignacion =>
        this._pdf.abrirReportePDF(reasignacion, 'REASIGNACIÓN')
      )
    );
  }
}
