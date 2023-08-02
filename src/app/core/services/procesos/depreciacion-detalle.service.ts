import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { DepreciacionDetalle } from '@core/models/procesos/depreciacion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class DepreciacionDetalleService extends GenericService<DepreciacionDetalle> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'depreciacionDetalle').valor;
  }
}
