import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { Id } from '@core/types/id';
import { Observable } from 'rxjs';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarActivosUbicacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-ubicacion';
import { adaptarActivoUbicacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-ubicacion';

@Injectable({
  providedIn: 'root',
})
export class ActivoUbicacionService extends GenericService<ActivoUbicacion> {
  private apiUrlActivoId = (id: Id) => `${this.apiUrl}?activo_id=${id}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoUbicacion').valor;
  }

  buscarTodos(): Observable<ActivoUbicacion[]> {
    return super.buscarTodos().pipe(adaptarActivosUbicacion());
  }

  buscarPorActivo(activoId: Id): Observable<ActivoUbicacion> {
    return this._http.get<ActivoUbicacion>(this.apiUrlActivoId(activoId)).pipe(
      map((res: any) => res.data),
      map((data: any[]) => data[0]),
      map(normalizarObjeto),
      adaptarActivoUbicacion()
    );
  }

  buscarPorId(id: Id): Observable<ActivoUbicacion> {
    return super.buscarPorId(id).pipe(adaptarActivoUbicacion());
  }

  guardar(
    entidad: ActivoUbicacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoUbicacion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarActivoUbicacion());
  }
}
