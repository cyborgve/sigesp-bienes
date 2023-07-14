import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Origen } from '@core/models/definiciones/origen';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class OrigenService extends GenericService<Origen> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'origen').valor;
  }
}
