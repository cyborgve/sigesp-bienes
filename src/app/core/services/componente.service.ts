import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Componente } from '@core/models/componente';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ComponenteService extends GenericService<Componente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoComponente').valor;
  }
}
