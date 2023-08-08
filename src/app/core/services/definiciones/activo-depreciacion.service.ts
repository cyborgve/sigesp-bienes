import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { Id } from '@core/types/id';
import { Observable } from 'rxjs';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { convertirTipoOracion } from '@core/utils/funciones/convertir-tipo-oracion';

@Injectable({
  providedIn: 'root',
})
export class ActivoDepreciacionService extends GenericService<ActivoDepreciacion> {
  private apiUrlActivoId = (activoId: Id) =>
    `${this.apiUrl}?activo_id=${activoId}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoDepreciacion').valor;
  }

  buscarPorActivo(activoId: Id): Observable<ActivoDepreciacion> {
    return this._http
      .get<ActivoDepreciacion>(this.apiUrlActivoId(activoId))
      .pipe(
        map((res: any) => res.data[0]),
        map((res: any) => normalizarObjeto(res))
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
            `${convertirTipoOracion(
              tipoDato
            )}: ${activo_id}, fue eliminado correctamente`
          );
      })
    );
  }
}
