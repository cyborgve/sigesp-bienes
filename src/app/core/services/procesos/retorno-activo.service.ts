import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import { adaptarActivosProceso } from '@core/utils/adaptadores-rxjs/adaptar-activos-proceso';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarActivoProceso } from '@core/utils/adaptadores-rxjs/adaptar-activo-proceso';

@Injectable({
  providedIn: 'root',
})
export class RetornoActivoService extends GenericService<ActivoProceso> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'retornoActivo').valor;
  }
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;

  buscarTodos(): Observable<ActivoProceso[]> {
    return super.buscarTodos().pipe(adaptarActivosProceso());
  }

  buscarTodosPorProceso(proceso: Id) {
    return this._http.get(this.apiUrlProceso(proceso)).pipe(
      map((resultado: any) => resultado.data),
      map((procesos: any[]) =>
        procesos.map(proceso => normalizarObjeto(proceso))
      ),
      adaptarActivosProceso()
    );
  }

  buscarPorId(id: Id): Observable<ActivoProceso> {
    return super.buscarPorId(id).pipe(adaptarActivoProceso());
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
