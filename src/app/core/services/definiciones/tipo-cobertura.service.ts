import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { TipoCobertura } from '@core/models/definiciones/tipo-cobertura';
import { END_POINTS } from '@core/constants/end-points';
import {
  adaptarTipoCobertura,
  adaptarTiposCobertura,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-tipo-cobertura';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class TipoCoberturaService extends GenericService<TipoCobertura> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoCobertura').valor;
  }

  buscarTodos(): Observable<TipoCobertura[]> {
    return super.buscarTodos().pipe(adaptarTiposCobertura());
  }

  buscarPorId(id: Id): Observable<TipoCobertura> {
    return super.buscarPorId(id).pipe(adaptarTipoCobertura());
  }

  guardar(
    entidad: TipoCobertura,
    tipoDato: string,
    notificar?: boolean
  ): Observable<TipoCobertura> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarTipoCobertura());
  }
}
