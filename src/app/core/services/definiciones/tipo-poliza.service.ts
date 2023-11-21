import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { TipoPoliza } from '@core/models/definiciones/tipo-poliza';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarTipoPoliza,
  adaptarTiposPoliza,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-tipo-poliza';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class TipoPolizaService extends GenericService<TipoPoliza> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoPoliza').valor;
  }

  buscarTodos(): Observable<TipoPoliza[]> {
    return super.buscarTodos().pipe(adaptarTiposPoliza());
  }

  buscarPorId(id: Id): Observable<TipoPoliza> {
    return super.buscarPorId(id).pipe(adaptarTipoPoliza());
  }

  guardar(
    entidad: TipoPoliza,
    tipoDato: string,
    notificar?: boolean
  ): Observable<TipoPoliza> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarTipoPoliza());
  }
}
