import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { ActivoIntegracion } from '@core/models/definiciones/activo-integracion';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import {
  adaptarActivoIntegracion,
  adaptarActivosIntegracion,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-integracion';

@Injectable({
  providedIn: 'root',
})
export class ActivoIntegracionService extends GenericService<ActivoIntegracion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoIntegracion').valor;
  }
  private apiUrlActivoId = (id: Id) => `${this.apiUrl}?activo_id=${id}`;

  buscarTodos(): Observable<ActivoIntegracion[]> {
    return super.buscarTodos().pipe(adaptarActivosIntegracion());
  }

  buscarPorId(id: Id): Observable<ActivoIntegracion> {
    return super.buscarPorId(id).pipe(adaptarActivoIntegracion());
  }

  buscarPorActivo(activoId: Id): Observable<ActivoIntegracion> {
    return this._http
      .get<ActivoIntegracion>(this.apiUrlActivoId(activoId))
      .pipe(
        map((res: any) => res.data[0]),
        map(normalizarObjeto),
        adaptarActivoIntegracion()
      );
  }

  guardar(
    entidad: ActivoIntegracion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoIntegracion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarActivoIntegracion());
  }
}
