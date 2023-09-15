import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import { adaptarEntregaUnidad } from '@core/utils/adaptadores-rxjs/adaptar-entrega-unidad';
import { adaptarEntregasUnidad } from '@core/utils/adaptadores-rxjs/adaptar-entregas-unidad';
import { Id } from '@core/types/id';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PDFService } from '../auxiliares/pdf.service';
import { tap } from 'rxjs/operators';

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
    return super.guardar(entidad, tipoDato, notificar).pipe(
      adaptarEntregaUnidad(),
      tap(entregaUnidad =>
        entregaUnidad
          ? this._pdf.abrirReportePDFEntregaUnidad(entregaUnidad)
          : undefined
      )
    );
  }
}
