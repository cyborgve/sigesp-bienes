import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from './generic.service';
import { ActivoDetalle } from '@core/models/activo-detalle';

@Injectable({
  providedIn: 'root',
})
export class ActivoDetalleService extends GenericService<ActivoDetalle> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoDetalle').valor;
  }
}
