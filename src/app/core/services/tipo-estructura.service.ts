import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TipoEstructura } from '@core/models/tipo-estructura';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoEstructuraService extends GenericService<TipoEstructura> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoEstructura').valor;
  }
}
