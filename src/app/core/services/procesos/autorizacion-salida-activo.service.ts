import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarActivosProceso } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-proceso';
import { adaptarActivoProceso } from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-proceso';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionSalidaActivoService extends GenericService<ActivoProceso> {
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'autorizacionSalidaActivo').valor;
  }

  buscarTodos(): Observable<ActivoProceso[]> {
    return super.buscarTodos().pipe(adaptarActivosProceso());
  }

  buscarTodosPorProceso(autorizacionSalida: Id): Observable<ActivoProceso[]> {
    return this._http
      .get<ActivoProceso[]>(this.apiUrlProceso(autorizacionSalida))
      .pipe(
        map((resultado: any) => resultado.data),
        map((datos: any[]) => datos.map(normalizarObjeto)),
        adaptarActivosProceso()
      );
  }

  buscarPorId(id: Id): Observable<ActivoProceso> {
    return super.buscarPorId(id).pipe(adaptarActivoProceso());
  }

  guardar(
    entidad: ActivoProceso,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoProceso> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarActivoProceso());
  }
}
