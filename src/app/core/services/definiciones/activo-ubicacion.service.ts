import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { Id } from '@core/types/id';
import { Observable } from 'rxjs';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { tipoOracion } from '@core/utils/funciones/tipo-oracion';

@Injectable({
  providedIn: 'root',
})
export class ActivoUbicacionService extends GenericService<ActivoUbicacion> {
  private apiUrlActivoId = (id: Id) => `${this.apiUrl}?activo_id=${id}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoUbicacion').valor;
  }

  buscarPorActivo(activoId: Id): Observable<ActivoUbicacion> {
    return this._http.get<ActivoUbicacion>(this.apiUrlActivoId(activoId)).pipe(
      map((res: any) => res.data as ActivoUbicacion[]),
      map((res: any) => normalizarObjeto(res[0]))
    );
  }

  eliminarPorActivo(
    activo_id: Id,
    tipoDato: string,
    notificar?: boolean
  ): Observable<boolean> {
    return this._http.delete<boolean>(this.apiUrlActivoId(activo_id)).pipe(
      map((res: any) => res.data[0]),
      tap(eliminado => {
        if (eliminado && notificar)
          this.snackBarMessage(
            `${tipoOracion(
              tipoDato
            )}: ${activo_id}, fue eliminado correctamente`
          );
      })
    );
  }
}
