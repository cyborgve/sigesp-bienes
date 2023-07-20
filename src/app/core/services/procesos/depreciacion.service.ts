import { Injectable } from '@angular/core';
import { GenericService } from '../generic.service';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class DepreciacionService extends GenericService<Depreciacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'depreciacion').valor;
  }
}