import { switchMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Id } from '@core/types/id';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActaPrestamoActivoService } from './acta-prestamo-activo.service';

@Injectable({
  providedIn: 'root',
})
export class ActaPrestamoService extends GenericService<ActaPrestamo> {
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
      switchMap(actaPrestamo => {
        let buscarActivos = this._actaPrestamoActivo.buscarTodosPorActaPrestamo(
          actaPrestamo.id
        );
        return forkJoin([buscarActivos]).pipe(
          map(([activos]) => {
            actaPrestamo.activos = activos;
            return actaPrestamo;
          })
        );
      })
    );
  }

  guardar(
    actaPrestamo: ActaPrestamo,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActaPrestamo> {
    if (!notificar) notificar = true;
    return super.guardar(actaPrestamo, tipoDato, notificar).pipe(
      switchMap(acta => {
        let guardarActivos = actaPrestamo.activos.map(apa => {
          apa.actaPrestamo = acta.id;
          return this._actaPrestamoActivo.guardar(apa, undefined, false);
        });
        return forkJoin(guardarActivos).pipe(
          map(actaPrestamoActivos => {
            acta.activos = actaPrestamoActivos;
            return acta;
          })
        );
      })
    );
  }

  actualziar(
    actaPrestamo: ActaPrestamo,
    tipoDato: string,
    notificar?: boolean
  ): Observable<number> {
    if (!notificar) notificar = true;
    return super
      .actualizar(actaPrestamo.id, actaPrestamo, tipoDato, notificar)
      .pipe(
        switchMap(number => {
          let actualizarActivos = actaPrestamo.activos.map(apa => {
            return this._actaPrestamoActivo.guardar(apa, undefined, false);
          });
          return forkJoin(actualizarActivos).pipe(
            map(actaPrestamoActivos => {
              return actaPrestamoActivos.length;
            })
          );
        })
      );
  }
}
