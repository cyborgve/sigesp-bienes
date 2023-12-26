import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { Id } from '@core/types/id';
import { Observable } from 'rxjs';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarActivoDepreciacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-depreciacion';
import { adaptarActivosDepreciacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-depreciacion';

@Injectable({
  providedIn: 'root',
})
export class ActivoDepreciacionService extends GenericService<ActivoDepreciacion> {
  private apiUrlActivoId = (activoId: Id) =>
    `${this.apiUrl}?activo_id=${activoId}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoDepreciacion').valor;
  }

  buscarTodos(): Observable<ActivoDepreciacion[]> {
    return super.buscarTodos().pipe(adaptarActivosDepreciacion());
  }

  buscarPorActivo(activoId: Id): Observable<ActivoDepreciacion> {
    return this._http
      .get<ActivoDepreciacion>(this.apiUrlActivoId(activoId))
      .pipe(
        map((res: any) => res.data[0]),
        map(normalizarObjeto),
        adaptarActivoDepreciacion()
      );
  }

  buscarPorId(id: Id): Observable<ActivoDepreciacion> {
    return super.buscarPorId(id).pipe(adaptarActivoDepreciacion());
  }

  guardar(
    entidad: ActivoDepreciacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoDepreciacion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarActivoDepreciacion());
  }
}
