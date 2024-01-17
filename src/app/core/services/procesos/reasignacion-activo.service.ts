import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { ActivoProcesoReasignacion } from '@core/models/auxiliares/activo-proceso-reasignacion';
import {
  adaptarActivoProcesoReasignacion,
  adaptarActivosProcesoReasignacion,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-proceso-reasignacion';

@Injectable({
  providedIn: 'root',
})
export class ReasignacionActivoService extends GenericService<ActivoProcesoReasignacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'reasignacionActivo').valor;
  }
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;

  buscarTodos(): Observable<ActivoProcesoReasignacion[]> {
    return super.buscarTodos().pipe(adaptarActivosProcesoReasignacion());
  }

  buscarTodosPorProceso(proceso: Id) {
    return this._http.get(this.apiUrlProceso(proceso)).pipe(
      map((resultado: any) => resultado.data),
      map((procesos: any[]) => procesos.map(normalizarObjeto)),
      adaptarActivosProcesoReasignacion()
    );
  }

  buscarPorId(id: Id): Observable<ActivoProcesoReasignacion> {
    return super.buscarPorId(id).pipe(adaptarActivoProcesoReasignacion());
  }

  guardar(
    entidad: ActivoProcesoReasignacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoProcesoReasignacion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarActivoProcesoReasignacion());
  }
}
