import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { DetalleDepreciacion } from '@core/models/procesos/depreciacion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class DepreciacionDetalleService extends GenericService<DetalleDepreciacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'depreciacionDetalle').valor;
  }
}
