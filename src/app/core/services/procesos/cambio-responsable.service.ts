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
        let ubicarActivo = this._activoUbicacion
          .buscarPorActivo(cambioResponsable.activo)
          .pipe(
            map(activoUbicacion => {
              if (Number(cambioResponsableGuardado.tipoResponsable) === 0)
                activoUbicacion.responsableId =
                  cambioResponsableGuardado.nuevoResponsable;
              else if (Number(cambioResponsableGuardado.tipoResponsable) === 1)
                activoUbicacion.responsableUsoId =
                  cambioResponsableGuardado.nuevoResponsable;
              return activoUbicacion;
            })
          );
        return forkJoin([ubicarActivo]).pipe(
          switchMap(([activoUbicado]) => {
            let cambiarResponsable = this._activoUbicacion.actualizar(
              activoUbicado.id,
              activoUbicado,
              undefined,
              false
            );
            return forkJoin([cambiarResponsable]).pipe(
              map(() => cambioResponsableGuardado)
            );
          })
        );
      })
    );
  }
}
