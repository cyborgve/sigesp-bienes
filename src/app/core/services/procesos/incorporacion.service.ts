import { switchMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { END_POINTS } from '@core/constants/end-points';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncorporacionActivoService } from './incorporacion-activo.service';
import { Observable, forkJoin, of, pipe } from 'rxjs';
import { adaptarIncorporaciones } from '@core/utils/adaptadores-rxjs/adaptar-incorporaciones';
import { Id } from '@core/types/id';
import { adaptarIncorporacion } from '@core/utils/adaptadores-rxjs/adaptar-incorporacion';
import { XLSXService } from '../auxiliares/xlsx.service';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';
import { PDFService } from '../auxiliares/pdf.service';

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
    private _xlsx: XLSXService,
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
      switchMap(incorporacionGuardada => {
        let ubicacionActivos = incorporacionGuardada.activos.map(
          activoProceso =>
            this._activoUbicacion.buscarPorActivo(activoProceso.activo).pipe(
              map(activoUbicacion => {
                activoUbicacion.unidadAdministrativaId =
                  incorporacionGuardada.unidadAdministrativa;
                activoUbicacion.sedeId = incorporacionGuardada.sede;
                activoUbicacion.responsableId =
                  incorporacionGuardada.responsablePrimario;
                activoUbicacion.responsableUsoId =
                  incorporacionGuardada.responsableUso;
                activoUbicacion.fechaIngreso =
                  incorporacionGuardada.fechaEntrega;
                return activoUbicacion;
              })
            )
        );
        return forkJoin(ubicacionActivos).pipe(
          switchMap(activosUbicados => {
            let incorporarActivos = activosUbicados.map(act =>
              this._activoUbicacion.actualizar(act.id, act, undefined, false)
            );
            return forkJoin(incorporarActivos).pipe(
              map(() => incorporacionGuardada)
            );
          })
        );
      }),
      tap(incorporacion =>
        incorporacion
          ? this._pdf.abrirDocumento(incorporacion, 'INCORPORACION')
          : undefined
      )
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
          switchMap(incorporacionEliminada => {
            if (!incorporacionEliminada) return of(false);
            else {
              let ubicarActivos = incorporacion.activos.map(ap =>
                this._activoUbicacion.buscarPorId(ap.activo)
              );
              return forkJoin(ubicarActivos).pipe(
                switchMap(activosUbicados => {
                  let desincorporarActivos = activosUbicados.map(au => {
                    au.responsableId = '---';
                    au.responsableUsoId = '---';
                    au.unidadAdministrativaId = 0;
                    au.sedeId = 0;
                    au.fechaIngreso = undefined;
                    return this._activoUbicacion.actualizar(
                      au.id,
                      au,
                      undefined,
                      false
                    );
                  });
                  return forkJoin(desincorporarActivos).pipe(
                    map(activosDesincorporados => {
                      let todosDesincorporados = activosDesincorporados.every(
                        des => des > 0
                      );
                      return todosDesincorporados;
                    })
                  );
                })
              );
            }
          })
        );
      })
    );
  }
}
