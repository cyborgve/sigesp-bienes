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
import { XLSXService } from '../auxiliares/xlsx.service';

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
    private _xlsx: XLSXService
  ) {
    super(_http, _sigesp, _snackBar);
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
      tap(autorizacionSalida =>
        this._xlsx.exportarProceso(
          autorizacionSalida,
          'AUTORIZACIÓN DE SALIDA',
          true
        )
      )
    );
  }
}
