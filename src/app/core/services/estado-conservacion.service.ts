import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { EstadoConservacion } from '@core/models/estado-conservacion';

@Injectable({
  providedIn: 'root',
})
export class EstadoConservacionService extends GenericService<EstadoConservacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'estadoConservacion').valor;
  }
}
