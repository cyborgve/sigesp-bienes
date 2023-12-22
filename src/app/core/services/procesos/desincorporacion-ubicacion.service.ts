import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { DesincorporacionUbicacion } from '@core/models/auxiliares/desincorporacion-ubicacion';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { Observable } from 'rxjs';
import {
  adaptarDesincorporacionUbicacion,
  adaptarDesincorporacionUbicaciones,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-desincorporacion-ubicacion';
import { map } from 'rxjs/operators';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

@Injectable({
  providedIn: 'root',
})
export class DesincorporacionUbicacionService extends GenericService<DesincorporacionUbicacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => (ep.clave = 'dessincorporacionUbicacion'))
      .valor;
  }

  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;

  buscarTodos(): Observable<DesincorporacionUbicacion[]> {
    return super.buscarTodos().pipe(adaptarDesincorporacionUbicaciones());
  }

  buscarTodosPorProceso(proceso: Id): Observable<DesincorporacionUbicacion[]> {
    return this._http.get<any>(this.apiUrlProceso(proceso)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarDesincorporacionUbicaciones()
    );
  }

  buscarPorId(id: Id): Observable<DesincorporacionUbicacion> {
    return super.buscarPorId(id).pipe(adaptarDesincorporacionUbicacion());
  }

  guardar(
    entidad: DesincorporacionUbicacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<DesincorporacionUbicacion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarDesincorporacionUbicacion());
  }
}
