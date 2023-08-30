import { tap, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';
import { END_POINTS } from '@core/constants/end-points';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XLSXService } from '../auxiliares/xlsx.service';
import { Observable, forkJoin } from 'rxjs';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';

@Injectable({
  providedIn: 'root',
})
export class CambioResponsableService extends GenericService<CambioResponsable> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'cambioResponsable').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _activoUbicacion: ActivoUbicacionService,
    private _xlsx: XLSXService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  guardar(
    cambioResponsable: CambioResponsable,
    tipoDato: string,
    notificar?: boolean
  ): Observable<CambioResponsable> {
    return super.guardar(cambioResponsable, tipoDato, notificar).pipe(
      switchMap(cambioResponsableGuardado => {
        let cambiarResponsable = this._activoUbicacion
          .buscarPorActivo(cambioResponsableGuardado.activo)
          .pipe(
            map(activoUbicacion => {
              if (cambioResponsableGuardado.tipoResponsable === 0) {
                activoUbicacion.responsableId =
                  cambioResponsableGuardado.responsableActual;
              } else if (cambioResponsableGuardado.tipoResponsable === 1) {
                activoUbicacion.responsableUsoId =
                  cambioResponsableGuardado.responsableActual;
              }
              return forkJoin([
                this._activoUbicacion.actualizar(
                  activoUbicacion.id,
                  activoUbicacion,
                  undefined,
                  false
                ),
              ]).pipe(map(ejecutado => (ejecutado.length > 0 ? true : false)));
            })
          );
        return forkJoin([cambiarResponsable]).pipe(
          map(([procesado]) =>
            procesado ? cambioResponsableGuardado : undefined
          )
        );
      }),
      tap(cambioResponsableprocesado =>
        cambioResponsableprocesado
          ? this._xlsx.exportarProceso(
              cambioResponsableprocesado,
              'CAMBIO DE RESPONSABLE',
              false
            )
          : undefined
      )
    );
  }
}
