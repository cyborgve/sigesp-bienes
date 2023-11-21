import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { Observable } from 'rxjs';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarActivosDetalle } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-detalle';
import { adaptarActivoDetalle } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-detalle';

@Injectable({
  providedIn: 'root',
})
export class ActivoDetalleService extends GenericService<ActivoDetalle> {
  private apiUrlActivoId = (id: Id) => `${this.apiUrl}?activo_id=${id}`;

  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoDetalle').valor;
  }

  buscarTodos(): Observable<ActivoDetalle[]> {
    return super.buscarTodos().pipe(adaptarActivosDetalle());
  }

  buscarPorActivo(activoId: Id): Observable<ActivoDetalle> {
    return this._http.get<ActivoDetalle>(this.apiUrlActivoId(activoId)).pipe(
      map((res: any) => res.data[0]),
      map(actDet => normalizarObjeto(actDet)),
      adaptarActivoDetalle()
    );
  }

  buscarPorId(id: Id): Observable<ActivoDetalle> {
    return super.buscarPorId(id).pipe(adaptarActivoDetalle());
  }

  guardar(
    entidad: ActivoDetalle,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoDetalle> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarActivoDetalle());
  }
}
