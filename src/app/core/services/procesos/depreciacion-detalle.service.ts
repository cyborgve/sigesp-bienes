import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import { adaptarDetalleDepreciacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-detalle-depreciacion';
import { adaptarDetallesDepreciacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-detalle-depreciacion';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';

@Injectable({
  providedIn: 'root',
})
export class DepreciacionDetalleService extends GenericService<DetalleDepreciacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'depreciacionDetalle').valor;
  }
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;

  buscarTodos(): Observable<DetalleDepreciacion[]> {
    return super.buscarTodos().pipe(adaptarDetallesDepreciacion());
  }

  buscarTodosPorProceso(depreciacion: Id): Observable<DetalleDepreciacion[]> {
    return this._http.get(this.apiUrlProceso(depreciacion)).pipe(
      map((resultado: any) => resultado.data),
      map((detallesDepreciacion: any[]) =>
        detallesDepreciacion.map(detalleDepreciacion =>
          normalizarObjeto(detalleDepreciacion)
        )
      ),
      adaptarDetallesDepreciacion(),
      map(detalles =>
        detalles.sort((dda, ddb) => (dda.dias > ddb.dias ? 1 : -1))
      )
    );
  }

  buscarPorId(id: Id): Observable<DetalleDepreciacion> {
    return super.buscarPorId(id).pipe(adaptarDetalleDepreciacion());
  }

  guardar(
    entidad: DetalleDepreciacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<DetalleDepreciacion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarDetalleDepreciacion());
  }
}
