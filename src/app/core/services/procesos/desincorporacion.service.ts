import { Injectable } from '@angular/core';
import { GenericService } from '../generic.service';
import { Desincorporacion } from '@core/models/procesos/desincorporacion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class DesincorporacionService extends GenericService<Desincorporacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'desincorporacion').valor;
  }
}
