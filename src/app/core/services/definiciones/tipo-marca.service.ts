import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { TipoMarca } from '@core/models/definiciones/tipo-marca';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import { Id } from '@core/types/id';
import {
  adaptarTipoMarca,
  adaptarTiposMarca,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-tipo-marca';

@Injectable({
  providedIn: 'root',
})
export class TipoMarcaService extends GenericService<TipoMarca> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoMarca').valor;
  }

  buscarTodos(): Observable<TipoMarca[]> {
    return super.buscarTodos().pipe(adaptarTiposMarca());
  }

  buscarPorId(id: Id): Observable<TipoMarca> {
    return super.buscarPorId(id).pipe(adaptarTipoMarca());
  }

  guardar(
    entidad: TipoMarca,
    tipoDato: string,
    notificar?: boolean
  ): Observable<TipoMarca> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarTipoMarca());
  }
}
