import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { GenericService } from '../auxiliares/generic.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { adaptarActivosProceso } from '@core/utils/adaptadores-rxjs/adaptar-activos-proceso';
import { adaptarActivoProceso } from '@core/utils/adaptadores-rxjs/adaptar-activo-proceso';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

@Injectable({
  providedIn: 'root',
})
export class ActaPrestamoActivoService extends GenericService<ActivoProceso> {
  private apiUrlActaPrestamo = (proceso: Id) =>
    `${this.apiUrl}?proceso=${proceso}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'actaPrestamoActivo').valor;
  }

  buscarTodos(): Observable<ActivoProceso[]> {
    return super.buscarTodos().pipe(adaptarActivosProceso());
  }

  buscarPorId(id: Id): Observable<ActivoProceso> {
    return super.buscarPorId(id).pipe(adaptarActivoProceso());
  }

  buscarTodosPorProceso(actaPestamo: Id): Observable<ActivoProceso[]> {
    return this._http
      .get<ActivoProceso[]>(this.apiUrlActaPrestamo(actaPestamo))
      .pipe(
        map((resultado: any) => resultado.data),
        map((resultado: any[]) => resultado.map(res => normalizarObjeto(res))),
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
