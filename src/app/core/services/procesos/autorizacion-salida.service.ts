import { PDFService } from '@core/services/auxiliares/pdf.service';
import { tap, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { END_POINTS } from '@core/constants/end-points';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutorizacionSalidaActivoService } from './autorizacion-salida-activo.service';
import { adaptarAutorizacionesSalida } from '@core/utils/pipes-rxjs/adaptadores/adaptar-autorizaciones-salida';
import { Id } from '@core/types/id';
import { adaptarAutorizacionSalida } from '@core/utils/pipes-rxjs/adaptadores/adaptar-autorizacion-salida';
import { abrirReporteProceso } from '@core/utils/pipes-rxjs/procesos/abrir-reporte-proceso';
import { ejecutarAutorizacionSalida } from '@core/utils/pipes-rxjs/procesos/ejecutar-autorizacion-salida';
import { reversarAutorizacionSalida } from '@core/utils/pipes-rxjs/procesos/reversar-autorizacion-salida';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionSalidaService extends GenericService<AutorizacionSalida> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'autorizacionSalida').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _autorizacionSalidaActivo: AutorizacionSalidaActivoService,
    private _pdf: PDFService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<AutorizacionSalida[]> {
    return super.buscarTodos().pipe(adaptarAutorizacionesSalida());
  }

  buscarPorId(id: Id): Observable<AutorizacionSalida> {
    return super.buscarPorId(id).pipe(
      adaptarAutorizacionSalida(),
      switchMap(autorizacionSalida =>
        this._autorizacionSalidaActivo
          .buscarTodosPorProceso(autorizacionSalida.id)
          .pipe(
            map(activosEncontrados => {
              autorizacionSalida.activos = activosEncontrados;
              return autorizacionSalida;
            })
          )
      )
    );
  }

  guardar(
    autorizacionSalida: AutorizacionSalida,
    tipoDato: string,
    notificar?: boolean
  ): Observable<AutorizacionSalida> {
    return super.guardar(autorizacionSalida, tipoDato, notificar).pipe(
      switchMap(autorizacionGuardada => {
        let guardarActivos = autorizacionSalida.activos
          .map(activoProceso => {
            activoProceso.proceso = autorizacionGuardada.id;
            return activoProceso;
          })
          .map(activoProceso =>
            this._autorizacionSalidaActivo.guardar(
              activoProceso,
              undefined,
              false
            )
          );
        return forkJoin(guardarActivos).pipe(
          map(activosProcesoGuardados => {
            autorizacionGuardada.activos = activosProcesoGuardados;
            return autorizacionGuardada;
          })
        );
      }),
      ejecutarAutorizacionSalida(),
      abrirReporteProceso(this._pdf, 'AUTORIZACIÓN DE SALIDA')
    );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(autorizacionSalida =>
        super.eliminar(id, tipoDato, notificar).pipe(
          map(eliminado => {
            if (eliminado) return autorizacionSalida;
            return eliminado;
          }),
          reversarAutorizacionSalida(),
          map(autorizacionSalida => !!autorizacionSalida)
        )
      )
    );
  }
}
