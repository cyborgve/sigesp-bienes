import { switchMap, map } from 'rxjs/operators';
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
import { adaptarReasignaciones } from '@core/utils/pipes-rxjs/adaptadores/adaptar-reasignacion';
import { Id } from '@core/types/id';
import { adaptarReasignacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-reasignacion';
import { ejecutarReasignacion } from '@core/utils/pipes-rxjs/procesos/ejecutar-reasignacion';
import { abrirReporteProceso } from '@core/utils/pipes-rxjs/procesos/abrir-reporte-proceso';
import { reversarReasignacion } from '@core/utils/pipes-rxjs/procesos/reversar-reasignacion';

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
      ejecutarReasignacion(this),
      abrirReporteProceso(this._pdf, 'REASIGNACIÓN')
    );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(reasignacion =>
        super.eliminar(id, tipoDato, notificar).pipe(
          map(eliminada => (eliminada ? reasignacion : eliminada)),
          reversarReasignacion(this),
          map(reasignacion => !!reasignacion)
        )
      )
    );
  }
}
