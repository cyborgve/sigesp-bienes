import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import { adaptarEntregaUnidad } from '@core/utils/pipes-rxjs/adaptadores/adaptar-entrega-unidad';
import { adaptarEntregasUnidad } from '@core/utils/pipes-rxjs/adaptadores/adaptar-entregas-unidad';
import { Id } from '@core/types/id';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PDFService } from '../auxiliares/pdf.service';
import { abrirReporteProceso } from '@core/utils/pipes-rxjs/procesos/abrir-reporte-proceso';
import { ejecutarEntregaUnidad } from '@core/utils/pipes-rxjs/procesos/ejecutar-entrega-unidad';
import { map, switchMap } from 'rxjs/operators';
import { reversarEntregaUnidad } from '@core/utils/pipes-rxjs/procesos/reversar-entrega-unidad';

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
    private _pdf: PDFService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<EntregaUnidad[]> {
    return super.buscarTodos().pipe(adaptarEntregasUnidad());
  }

  buscarPorId(id: Id): Observable<EntregaUnidad> {
    return super.buscarPorId(id).pipe(adaptarEntregaUnidad());
  }

  guardar(
    entidad: EntregaUnidad,
    tipoDato: string,
    notificar?: boolean
  ): Observable<EntregaUnidad> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(
        adaptarEntregaUnidad(),
        ejecutarEntregaUnidad(),
        abrirReporteProceso(this._pdf, 'ENTREGA DE UNIDAD')
      );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(entregaUnidad =>
        super.eliminar(id, tipoDato, notificar).pipe(
          map(eliminada => (eliminada ? entregaUnidad : eliminada)),
          reversarEntregaUnidad(),
          map(entrega => !!entrega)
        )
      )
    );
  }
}
