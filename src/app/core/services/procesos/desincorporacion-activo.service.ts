import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { Observable } from 'rxjs';
import { adaptarActivosProceso } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-proceso';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarActivoProceso } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-proceso';

@Injectable({
  providedIn: 'root',
})
export class DesincorporacionActivoService extends GenericService<ActivoProceso> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'desincorporacionActivo').valor;
  }
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;

  buscarTodos(): Observable<ActivoProceso[]> {
    return super.buscarTodos().pipe(adaptarActivosProceso());
  }

  buscarTodosPorProceso(desincorporacion: Id): Observable<ActivoProceso[]> {
    return this._http.get(this.apiUrlProceso(desincorporacion)).pipe(
      map((resultado: any) => resultado.data),
      map(resultado => resultado.map(objeto => normalizarObjeto(objeto))),
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
