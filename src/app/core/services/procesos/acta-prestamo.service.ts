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
import { XLSXService } from '../auxiliares/xlsx.service';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';

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
    private _actaPrestamoActivo: ActaPrestamoActivoService,
    private _activoUbicacion: ActivoUbicacionService,
    private _xslx: XLSXService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarPorId(id: Id): Observable<ActaPrestamo> {
    return super.buscarPorId(id).pipe(
      switchMap(actaPrestamo => {
        let buscarActivos = this._actaPrestamoActivo.buscarTodosPorProceso(
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
      switchMap(actaPrestamoGuardada => {
        let guardarActivos = actaPrestamo.activos.map(activoProceso => {
          activoProceso.proceso = actaPrestamoGuardada.id;
          return this._actaPrestamoActivo.guardar(
            activoProceso,
            undefined,
            false
          );
        });
        return forkJoin(guardarActivos).pipe(
          map(activosGuardados => {
            actaPrestamoGuardada.activos = activosGuardados;
            return actaPrestamoGuardada;
          })
        );
      }),
      switchMap(actaPrestamoGuardada => {
        let ubicacionActivos = actaPrestamoGuardada.activos.map(activoProceso =>
          this._activoUbicacion.buscarPorActivo(activoProceso.activo).pipe(
            map(activoUbicacion => {
              activoUbicacion.unidadAdministrativaId =
                actaPrestamoGuardada.unidadAdministrativaReceptora;
              activoUbicacion.responsableUsoId =
                actaPrestamoGuardada.unidadReceptoraResponsable;
              return activoUbicacion;
            })
          )
        );
        return forkJoin(ubicacionActivos).pipe(
          switchMap(activosUbicados => {
            let prestarActivos = activosUbicados.map(activoUbicado =>
              this._activoUbicacion.actualizar(
                activoUbicado.id,
                activoUbicado,
                undefined,
                false
              )
            );
            return forkJoin(prestarActivos).pipe(
              map(() => actaPrestamoGuardada)
            );
          })
        );
      }),
      tap(actaPrestamo =>
        this._xslx.exportarProceso(actaPrestamo, 'ACTA DE PRESTAMO', true)
      )
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
