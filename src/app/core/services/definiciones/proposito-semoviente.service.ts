import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { PropositoSemoviente } from '@core/models/definiciones/proposito-semoviente';
import { END_POINTS } from '@core/constants/end-points';
import {
  adaptarPropositoSemoviente,
  adaptarPropositosSemoviente,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-proposito-semoviente';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class PropositoSemovienteService extends GenericService<PropositoSemoviente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'propositoSemoviente').valor;
  }

  buscarTodos(): Observable<PropositoSemoviente[]> {
    return super.buscarTodos().pipe(adaptarPropositosSemoviente());
  }

  buscarPorId(id: Id): Observable<PropositoSemoviente> {
    return super.buscarPorId(id).pipe(adaptarPropositoSemoviente());
  }

  guardar(
    entidad: PropositoSemoviente,
    tipoDato: string,
    notificar?: boolean
  ): Observable<PropositoSemoviente> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarPropositoSemoviente());
  }
}
