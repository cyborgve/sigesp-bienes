import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { END_POINTS } from '@core/constants/end-points';
import { Observable, forkJoin } from 'rxjs';
import { adaptarEntregaUnidad } from '@core/utils/pipes-rxjs/adaptadores/adaptar-entrega-unidad';
import { adaptarEntregasUnidades } from '@core/utils/pipes-rxjs/adaptadores/adaptar-entrega-unidad';
import { Id } from '@core/types/id';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { PDFService } from '../auxiliares/pdf.service';
import { abrirReporteProceso } from '@core/utils/pipes-rxjs/procesos/abrir-reporte-proceso';
import { ejecutarEntregaUnidad } from '@core/utils/pipes-rxjs/procesos/ejecutar-entrega-unidad';
import { map, switchMap, tap } from 'rxjs/operators';
import { reversarEntregaUnidad } from '@core/utils/pipes-rxjs/procesos/reversar-entrega-unidad';
import { UnidadAdministrativaService } from '../definiciones/unidad-administrativa.service';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';
import { EntregaUnidadActivoService } from './entrega-unidad-activo.service';

@Injectable({
  providedIn: 'root',
})
export class EntregaUnidadService extends GenericService<EntregaUnidad> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'entregaUnidad').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _entregaUnidadActivo: EntregaUnidadActivoService,
    private _unidadAdministrativa: UnidadAdministrativaService,
    private _activoUbicacion: ActivoUbicacionService,
    private _pdf: PDFService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<EntregaUnidad[]> {
    return super.buscarTodos().pipe(adaptarEntregasUnidades());
  }

  buscarPorId(id: Id): Observable<EntregaUnidad> {
    return super.buscarPorId(id).pipe(
      adaptarEntregaUnidad(),
      switchMap(entregaUnidad =>
        this._entregaUnidadActivo.buscarTodosPorProceso(entregaUnidad.id).pipe(
          map(activos => {
            entregaUnidad.activos = activos;
            return entregaUnidad;
          })
        )
      )
    );
  }

  guardar(
    entidad: EntregaUnidad,
    tipoDato: string,
    notificar?: boolean
  ): Observable<EntregaUnidad> {
    return super.guardar(entidad, tipoDato, notificar).pipe(
      adaptarEntregaUnidad(),
      switchMap(entregaUnidad => {
        let guardarActivos = entidad.activos
          .map(activoProceso => {
            activoProceso.proceso = entregaUnidad.id;
            return activoProceso;
          })
          .map(activoProceso =>
            this._entregaUnidadActivo.guardar(activoProceso, undefined, false)
          );
        return forkJoin(guardarActivos).pipe(
          map(activosGuardados => {
            entregaUnidad.activos = activosGuardados;
            return entregaUnidad;
          })
        );
      }),
      ejecutarEntregaUnidad(this._unidadAdministrativa, this._activoUbicacion),
      abrirReporteProceso(this._pdf, 'ENTREGA DE UNIDAD')
    );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(entregaUnidad =>
        super.eliminar(id, tipoDato, notificar).pipe(
          map(eliminada => (eliminada ? entregaUnidad : eliminada)),
          reversarEntregaUnidad(
            entregaUnidad,
            this._unidadAdministrativa,
            this._activoUbicacion
          ),
          map(entrega => !!entrega)
        )
      )
    );
  }
}
