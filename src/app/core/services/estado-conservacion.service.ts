import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Conservacion } from '@core/models/conservacion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class EstadoConservacionService extends GenericService<Conservacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'estadoConservacion').valor;
  }
}
