import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { Observable } from 'rxjs';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarComponentes } from '@core/utils/adaptadores-rxjs.ts/adaptar-componentes';

@Injectable({
  providedIn: 'root',
})
export class ActivoComponenteService extends GenericService<ActivoComponente> {
  private apiUrlActivoId = (activoId: Id) =>
    `${this.apiUrl}?activo_id=${activoId}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoComponente').valor;
  }

  buscarPorActivo(activoId: Id): Observable<ActivoComponente[]> {
    return this._http.get<ActivoComponente>(this.apiUrlActivoId(activoId)).pipe(
      map((res: any) => res.data),
      map(componentes => componentes.map(c => normalizarObjeto(c))),
      adaptarComponentes()
    );
  }
}
