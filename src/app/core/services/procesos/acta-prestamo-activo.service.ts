import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { GenericService } from '../auxiliares/generic.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { adaptarActivosProceso } from '@core/utils/adaptadores-rxjs/adaptar-activos-proceso';
import { adaptarActivoProceso } from '@core/utils/adaptadores-rxjs/adaptar-activo-proceso';

@Injectable({
  providedIn: 'root',
})
export class ActaPrestamoActivoService extends GenericService<ActivoProceso> {
  private apiUrlActaPrestamo = (actaPrestamo: Id) =>
    `${this.apiUrl}?acta_prestamo=${actaPrestamo}`;
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
      .pipe(adaptarActivosProceso());
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
