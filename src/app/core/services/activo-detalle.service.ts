import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ActivoDetalleService {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoDetalle').valor;
  }
}
