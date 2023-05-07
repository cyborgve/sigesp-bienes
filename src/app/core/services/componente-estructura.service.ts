import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ComponenteEstructura } from '@core/models/componente-estructura';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ComponenteEstructuraService extends GenericService<ComponenteEstructura> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'componenteEstructura').valor;
  }
}
