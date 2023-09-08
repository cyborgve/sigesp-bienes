import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarActivosProceso } from '@core/utils/adaptadores-rxjs/adaptar-activos-proceso';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionSalidaActivoService extends GenericService<ActivoProceso> {
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'autorizacionSalidaActivo').valor;
  }

  buscarTodosPorProceso(autorizacionSalida: Id): Observable<ActivoProceso[]> {
    return this._http
      .get<ActivoProceso[]>(this.apiUrlProceso(autorizacionSalida))
      .pipe(
        map((res: any) => res.data),
        map((activosProceso: any[]) =>
          activosProceso.map(ap => normalizarObjeto(ap))
        ),
        adaptarActivosProceso()
      );
  }
}
