import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActaPrestamoActivoService } from './acta-prestamo-activo.service';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';
import { adaptarActasPrestamo } from '@core/utils/pipes-rxjs/adaptadores/adaptar-actas-prestamo';
import { adaptarActaPrestamo } from '@core/utils/pipes-rxjs/adaptadores/adaptar-acta-prestamo';
import { PDFService } from '../auxiliares/pdf.service';
import { GenericService } from '../auxiliares/generic.service';
import { abrirReporteProceso } from '@core/utils/pipes-rxjs/procesos/abrir-reporte-proceso';
import { ejecutarActaPrestamo } from '@core/utils/pipes-rxjs/procesos/ejecutar-acta-prestamo';
import { reversarActaPrestamo } from '@core/utils/pipes-rxjs/procesos/reversar-acta-prestamo';

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
    private _pdf: PDFService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<ActaPrestamo[]> {
    return super.buscarTodos().pipe(adaptarActasPrestamo());
  }

  buscarPorId(id: Id): Observable<ActaPrestamo> {
    return super.buscarPorId(id).pipe(
      adaptarActaPrestamo(),
      switchMap(actaPrestamo =>
        this._actaPrestamoActivo.buscarTodosPorProceso(actaPrestamo.id).pipe(
          map(activos => {
            actaPrestamo.activos = activos;
            return actaPrestamo;
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
      ejecutarActaPrestamo(this._activoUbicacion),
      abrirReporteProceso(this._pdf, 'ACTA DE PRÉSTAMO')
    );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(actaPrestamo =>
        super.eliminar(id, tipoDato, notificar).pipe(
          map(actaEliminada => (actaEliminada ? actaPrestamo : actaEliminada)),
          reversarActaPrestamo(this._activoUbicacion),
          map(actaPrestamo => !!actaPrestamo)
        )
      )
    );
  }
}
