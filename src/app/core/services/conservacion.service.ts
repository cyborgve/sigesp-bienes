import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Conservacion } from '@core/models/conservacion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ConservacionService extends GenericService<Conservacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'conservacion').valor;
  }
}
