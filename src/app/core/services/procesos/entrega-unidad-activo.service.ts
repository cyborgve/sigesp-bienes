import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { Id } from '@core/types/id';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarActivoProceso,
  adaptarActivosProceso,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-proceso';
import { map } from 'rxjs/operators';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

@Injectable({
  providedIn: 'root',
})
export class EntregaUnidadActivoService extends GenericService<ActivoProceso> {
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'entregaUnidadActivo').valor;
  }

  buscarTodos(): Observable<ActivoProceso[]> {
    return super.buscarTodos().pipe(adaptarActivosProceso());
  }

  buscarPorId(id: Id): Observable<ActivoProceso> {
    return super.buscarPorId(id).pipe(adaptarActivoProceso());
  }

  buscarTodosPorProceso(entregaUnidad: Id): Observable<ActivoProceso[]> {
    return this._http
      .get<ActivoProceso[]>(this.apiUrlProceso(entregaUnidad))
      .pipe(
        map((resultado: any) => resultado.data),
        map((resultado: any[]) => resultado.map(normalizarObjeto)),
        adaptarActivosProceso()
      );
  }

  guardar(
    entidad: ActivoProceso,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoProceso> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarActivoProceso());
  }
}
