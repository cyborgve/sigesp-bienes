import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from './generic.service';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { Observable } from 'rxjs';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

@Injectable({
  providedIn: 'root',
})
export class ActivoDetalleService extends GenericService<ActivoDetalle> {
  private apiUrlActivoId = (id: Id) => `${this.apiUrl}?activo_id=${id}`;

  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoDetalle').valor;
  }

  buscarPorActivoId(activoId: Id): Observable<ActivoDetalle> {
    return this._http.get<ActivoDetalle>(this.apiUrlActivoId(activoId)).pipe(
      map((res: any) => res.data as ActivoDetalle[]),
      map((res: any) => normalizarObjeto(res[0]))
    );
  }
}
