import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { ActivoProcesoRetorno } from '@core/models/auxiliares/activo-proceso-retorno';
import { adaptarActivosProcesoRetorno } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-proceso-retorno';
import { adaptarActivoProcesoRetorno } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-proceso-retorno';

@Injectable({
  providedIn: 'root',
})
export class RetornoActivoService extends GenericService<ActivoProcesoRetorno> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'retornoActivo').valor;
  }
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;

  buscarTodos(): Observable<ActivoProcesoRetorno[]> {
    return super.buscarTodos().pipe(adaptarActivosProcesoRetorno());
  }

  buscarTodosPorProceso(proceso: Id): Observable<ActivoProcesoRetorno[]> {
    return this._http.get(this.apiUrlProceso(proceso)).pipe(
      map((resultado: any) => resultado.data),
      map((procesos: any[]) => procesos.map(normalizarObjeto)),
      adaptarActivosProcesoRetorno()
    );
  }

  buscarPorId(id: Id): Observable<ActivoProcesoRetorno> {
    return super.buscarPorId(id).pipe(adaptarActivoProcesoRetorno());
  }

  guardar(
    entidad: ActivoProcesoRetorno,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoProcesoRetorno> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarActivoProcesoRetorno());
  }
}
