import { adaptarDepreciacion } from '@core/utils/adaptadores-rxjs/adaptar-depreciacion';
import { adaptarDepreciaciones } from '@core/utils/adaptadores-rxjs/adaptar-depreciaciones';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

@Injectable({
  providedIn: 'root',
})
export class DepreciacionService extends GenericService<Depreciacion> {
  private apiUrlActivo = (activo: Id) => `${this.apiUrl}?activo=${activo}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'depreciacion').valor;
  }

  buscarTodos(): Observable<Depreciacion[]> {
    return super.buscarTodos().pipe(adaptarDepreciaciones());
  }

  buscarTodosPorActivo(activo: Id): Observable<Depreciacion[]> {
    return this._http.get<Depreciacion[]>(this.apiUrlActivo(activo)).pipe(
      map((resultado: any) => resultado.data),
      map(resultado => normalizarObjeto(resultado)),
      adaptarDepreciaciones()
    );
  }

  buscarPorId(id: Id): Observable<Depreciacion> {
    return super.buscarPorId(id).pipe(adaptarDepreciacion());
  }

  guardar(
    entidad: Depreciacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Depreciacion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarDepreciacion());
  }
}
