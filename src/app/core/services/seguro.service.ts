import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Seguro } from '@core/models/seguro';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class SeguroService extends GenericService<Seguro> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'seguro').valor;
  }
}
