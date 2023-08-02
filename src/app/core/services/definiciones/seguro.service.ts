import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { Seguro } from '@core/models/definiciones/seguro';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class SeguroService extends GenericService<Seguro> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'seguro').valor;
  }
}
