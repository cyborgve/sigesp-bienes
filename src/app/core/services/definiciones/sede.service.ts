import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { Sede } from '@core/models/definiciones/sede';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class SedeService extends GenericService<Sede> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'sede').valor;
  }
}
