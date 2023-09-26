import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { END_POINTS } from '@core/constants/end-points';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncorporacionActivoService } from './incorporacion-activo.service';
import { Observable, forkJoin } from 'rxjs';
import { adaptarIncorporaciones } from '@core/utils/adaptadores-rxjs/adaptar-incorporaciones';
import { Id } from '@core/types/id';
import { adaptarIncorporacion } from '@core/utils/adaptadores-rxjs/adaptar-incorporacion';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';
import { PDFService } from '../auxiliares/pdf.service';
import { ejecutarIncorporacion } from '@core/utils/funciones/ejecutar-incorporacion';
import { abrirReporteProceso } from '@core/utils/funciones/abrir-reporte-proceso';
import { reversarIncorporacion } from '@core/utils/funciones/reversar-incorporacion';

@Injectable({
  providedIn: 'root',
})
export class IncorporacionService extends GenericService<Incorporacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'incorporacion').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _incorporacionActivo: IncorporacionActivoService,
    private _activoUbicacion: ActivoUbicacionService,
    private _pdf: PDFService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Incorporacion[]> {
    return super.buscarTodos().pipe(adaptarIncorporaciones());
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
      ejecutarIncorporacion(this._activoUbicacion),
      abrirReporteProceso(this._pdf, 'INCORPORACIÓN')
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
