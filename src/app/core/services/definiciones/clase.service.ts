import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Clase } from '@core/models/definiciones/clase';
import { END_POINTS } from '@core/constants/end-points';
import { adaptarClase } from '@core/utils/pipes-rxjs/adaptadores/adaptar-clase';
import { Id } from '@core/types/id';
import { adaptarClases } from '@core/utils/pipes-rxjs/adaptadores/adaptar-clase';

@Injectable({
  providedIn: 'root',
})
export class ClaseService extends GenericService<Clase> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'clase').valor;
  }

  buscarTodos(): Observable<Clase[]> {
    return super.buscarTodos().pipe(adaptarClases());
  }

  buscarPorId(id: Id): Observable<Clase> {
    return super.buscarPorId(id).pipe(adaptarClase());
  }

  guardar(
    entidad: Clase,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Clase> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarClase());
  }
}
