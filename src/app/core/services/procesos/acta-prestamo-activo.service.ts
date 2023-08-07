import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActaPrestamoActivo } from '@core/models/procesos/acta-prestamo';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { GenericService } from '../auxiliares/generic.service';

@Injectable({
  providedIn: 'root',
})
export class ActaPrestamoActivoService extends GenericService<ActaPrestamoActivo> {
  private apiUrlActaPrestamo = (actaPrestamo: Id) =>
    `${this.apiUrl}?acta_prestamo=${actaPrestamo}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'actaPrestamoActivo').valor;
  }

  buscarTodosPorActaPrestamo(
    actaPestamo: Id
  ): Observable<ActaPrestamoActivo[]> {
    return this._http.get<ActaPrestamoActivo[]>(
      this.apiUrlActaPrestamo(actaPestamo)
    );
  }
}
