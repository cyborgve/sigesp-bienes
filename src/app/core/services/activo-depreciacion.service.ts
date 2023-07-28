import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from './generic.service';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { Id } from '@core/types/id';
import { Observable } from 'rxjs';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

@Injectable({
  providedIn: 'root',
})
export class ActivoDepreciacionService extends GenericService<ActivoDepreciacion> {
  private apiUrlActivoId = (id: Id) => `${this.apiUrl}?activo_id=${id}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoDepreciacion').valor;
  }

  buscarPorActivo(activoId: Id): Observable<ActivoDepreciacion> {
    return this._http
      .get<ActivoDepreciacion>(this.apiUrlActivoId(activoId))
      .pipe(
        map((res: any) => res.data as ActivoDepreciacion[]),
        map((res: any) => normalizarObjeto(res[0]))
      );
  }
}
