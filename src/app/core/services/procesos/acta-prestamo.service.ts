import { map, switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { END_POINTS } from '@core/constants/end-points';
import { GenericProccessService } from './generic-proccess.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActaPrestamoActivoService } from './acta-prestamo-activo.service';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class ActaPrestamoService extends GenericProccessService<ActaPrestamo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'actaPrestamo').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _actaPrestamoActivo: ActaPrestamoActivoService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarPorId(id: Id): Observable<ActaPrestamo> {
    return super.buscarPorId(id).pipe(
      switchMap(actaPrestamo =>
        forkJoin([
          this._actaPrestamoActivo.buscarTodosPorActaPrestamo(actaPrestamo.id),
        ]).pipe(
          map(([activos]) => {
            let ap: ActaPrestamo = actaPrestamo;
            ap.activos = activos;
            return ap;
          })
        )
      )
    );
  }

  guardar(
    actaPrestamo: ActaPrestamo,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActaPrestamo> {
    return super.guardar(actaPrestamo, tipoDato, notificar).pipe(
      switchMap(actaPrestamoGuardada => {
        let peticionesGuardarActivos = actaPrestamo.activos.map(apa => {
          apa.activo = actaPrestamoGuardada.id;
          return this._actaPrestamoActivo.guardar(apa, undefined, false);
        });
        return forkJoin(peticionesGuardarActivos).pipe(
          map(activos => {
            return {
              ...actaPrestamoGuardada,
              activos: activos,
            };
          })
        );
      }),
      take(1)
    );
  }
}
