import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { TipoSemoviente } from '@core/models/definiciones/tipo-semoviente';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarTipoSemoviente,
  adaptarTiposSemoviente,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-tipo-semoviente';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class TipoSemovienteService extends GenericService<TipoSemoviente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoSemoviente').valor;
  }

  buscarTodos(): Observable<TipoSemoviente[]> {
    return super.buscarTodos().pipe(adaptarTiposSemoviente());
  }

  buscarPorId(id: Id): Observable<TipoSemoviente> {
    return super.buscarPorId(id).pipe(adaptarTipoSemoviente());
  }

  guardar(
    entidad: TipoSemoviente,
    tipoDato: string,
    notificar?: boolean
  ): Observable<TipoSemoviente> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarTipoSemoviente());
  }
}
