import { switchMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { END_POINTS } from '@core/constants/end-points';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncorporacionActivoService } from './incorporacion-activo.service';
import { Observable, forkJoin } from 'rxjs';
import { adaptarIncorporaciones } from '@core/utils/adaptadores-rxjs.ts/adaptar-incorporaciones';
import { Id } from '@core/types/id';
import { adaptarIncorporacion } from '@core/utils/adaptadores-rxjs.ts/adaptar-incorporacion';
import { generarDocumentoPDF } from '@core/utils/funciones/generar-documento-pdf';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { XLSXService } from '../auxiliares/xlsx.service';

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
    private _xlsx: XLSXService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Incorporacion[]> {
    return super.buscarTodos().pipe(adaptarIncorporaciones());
  }

  buscarPorId(id: Id): Observable<Incorporacion> {
    return super.buscarPorId(id).pipe(
      adaptarIncorporacion(),
      switchMap(incorporacion => {
        let activos = this._incorporacionActivo.buscarTodosPorProceso(
          incorporacion.id
        );
        return forkJoin([activos]).pipe(
          map(([activos]) => {
            incorporacion.activos = activos;
            return incorporacion;
          })
        );
      })
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
        let activosGuardar = incorporacion.activos
          .map(activo => {
            activo.proceso = incorporacionGuardada.id;
            return activo;
          })
          .map(activo =>
            this._incorporacionActivo.guardar(activo, undefined, false)
          );
        return forkJoin(activosGuardar).pipe(
          map(activos => {
            incorporacionGuardada.activos = activos;
            return incorporacionGuardada;
          })
        );
      }),
      tap(incorporacion =>
        this._xlsx.exportarProcesoExcel(
          [incorporacion],
          'INCORPORACIÓN',
          String(incorporacion.comprobante).substring(5)
        )
      )
    );
  }
}
