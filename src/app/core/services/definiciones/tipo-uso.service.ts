import { Injectable } from '@angular/core';
import { TipoUso } from '@core/models/definiciones/tipo-uso';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarTipoUso,
  adaptarTiposUso,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-tipo-uso';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class TipoUsoService extends GenericService<TipoUso> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoUso').valor;
  }

  buscarTodos(): Observable<TipoUso[]> {
    return super.buscarTodos().pipe(adaptarTiposUso());
  }

  buscarPorId(id: Id): Observable<TipoUso> {
    return super.buscarPorId(id).pipe(adaptarTipoUso());
  }

  guardar(
    entidad: TipoUso,
    tipoDato: string,
    notificar?: boolean
  ): Observable<TipoUso> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarTipoUso());
  }
}
