import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { GenericService } from '../auxiliares/generic.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActaPrestamoActivoService extends GenericService<ActivoProceso> {
  private apiUrlActaPrestamo = (actaPrestamo: Id) =>
    `${this.apiUrl}?acta_prestamo=${actaPrestamo}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'actaPrestamoActivo').valor;
  }

  buscarTodosPorActaPrestamo(actaPestamo: Id): Observable<ActivoProceso[]> {
    return this._http.get<ActivoProceso[]>(
      this.apiUrlActaPrestamo(actaPestamo)
    );
  }

  guardar(
    entidad: ActivoProceso,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoProceso> {
    return super.guardar(entidad, tipoDato, notificar);
  }
}
