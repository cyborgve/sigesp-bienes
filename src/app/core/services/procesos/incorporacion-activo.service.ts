import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarActivosProceso } from '@core/utils/adaptadores-rxjs.ts/adaptar-activos-proceso';
import { prepararActivoProceso } from '@core/utils/funciones/preparar-activo-proceso';
import { adaptarActivoProceso } from '@core/utils/adaptadores-rxjs.ts/adaptar-activo-proceso';

@Injectable({
  providedIn: 'root',
})
export class IncorporacionActivoService extends GenericService<ActivoProceso> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'incorporacionActivo').valor;
  }
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;

  buscarTodos(): Observable<ActivoProceso[]> {
    return super.buscarTodos().pipe(adaptarActivosProceso());
  }

  buscarPorId(id: Id): Observable<ActivoProceso> {
    return super
      .buscarPorId(id)
      .pipe(map(activo => prepararActivoProceso(activo)));
  }

  buscarTodosPorProceso(proceso: Id): Observable<ActivoProceso[]> {
    return this._http.get<ActivoProceso[]>(this.apiUrlProceso(proceso)).pipe(
      map((resultado: any) => resultado.data),
      map(data => data.map(item => normalizarObjeto(item))),
      adaptarActivosProceso()
    );
  }

  guardar(
    activoProceso: ActivoProceso,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoProceso> {
    return super
      .guardar(activoProceso, tipoDato, notificar)
      .pipe(adaptarActivoProceso());
  }
}
