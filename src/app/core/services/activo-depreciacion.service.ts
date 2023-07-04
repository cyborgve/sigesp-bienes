import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from './generic.service';
import { ActivoDepreciacion } from '@core/models/activo-depreciacion';

@Injectable({
  providedIn: 'root',
})
export class ActivoDepreciacionService extends GenericService<ActivoDepreciacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoDepreciacion').valor;
  }
}
