import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { TipoSede } from '@core/models/definiciones/tipo-sede';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarTipoSede,
  adaptarTiposSede,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-tipo-sede';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class TipoSedeService extends GenericService<TipoSede> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoSede').valor;
  }

  buscarTodos(): Observable<TipoSede[]> {
    return super.buscarTodos().pipe(adaptarTiposSede());
  }

  buscarPorId(id: Id): Observable<TipoSede> {
    return super.buscarPorId(id).pipe(adaptarTipoSede());
  }

  guardar(
    entidad: TipoSede,
    tipoDato: string,
    notificar?: boolean
  ): Observable<TipoSede> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarTipoSede());
  }
}
