import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { TipoComponente } from '@core/models/definiciones/tipo-componente';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarTipoComponente,
  adaptarTiposComponente,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-tipo-componente';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class TipoComponenteService extends GenericService<TipoComponente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoComponente').valor;
  }

  buscarTodos(): Observable<TipoComponente[]> {
    return super.buscarTodos().pipe(adaptarTiposComponente());
  }

  buscarPorId(id: Id): Observable<TipoComponente> {
    return super.buscarPorId(id).pipe(adaptarTipoComponente());
  }

  guardar(
    entidad: TipoComponente,
    tipoDato: string,
    notificar?: boolean
  ): Observable<TipoComponente> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarTipoComponente());
  }
}
