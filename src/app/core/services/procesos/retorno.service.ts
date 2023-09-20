import { switchMap, map, tap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { Retorno } from '@core/models/procesos/retorno';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RetornoActivoService } from './retorno-activo.service';
import { PDFService } from '../auxiliares/pdf.service';
import { adaptarRetorno } from '@core/utils/adaptadores-rxjs/adaptar-retorno';
import { adaptarRetornos } from '@core/utils/adaptadores-rxjs/adaptar-retornos';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class RetornoService extends GenericService<Retorno> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'retorno').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _retornoActivo: RetornoActivoService,
    private _pdf: PDFService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Retorno[]> {
    return super.buscarTodos().pipe(adaptarRetornos());
  }

  buscarPorId(id: Id): Observable<Retorno> {
    return super.buscarPorId(id).pipe(
      adaptarRetorno(),
      switchMap(retorno =>
        this._retornoActivo.buscarTodosPorProceso(retorno.id).pipe(
          map(activos => {
            retorno.activos = activos;
            console.log(retorno);
            return retorno;
          })
        )
      )
    );
  }

  guardar(
    entidad: Retorno,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Retorno> {
    return super.guardar(entidad, tipoDato, notificar).pipe(
      adaptarRetorno(),
      switchMap(retornoGuardado => {
        let guardarActivos = entidad.activos.map(activo => {
          activo.proceso = retornoGuardado.id;
          return this._retornoActivo.guardar(activo, undefined, false);
        });
        return forkJoin(guardarActivos).pipe(
          map(activosGuardados => {
            retornoGuardado.activos = activosGuardados;
            return retornoGuardado;
          })
        );
      }),
      tap(retorno =>
        retorno ? this._pdf.abrirReportePDF(retorno, 'RETORNO') : undefined
      )
    );
  }
}
