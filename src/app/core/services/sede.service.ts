import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Sede } from '@core/models/sede';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class SedeService extends GenericService<Sede> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'sede').valor;
  }
}
