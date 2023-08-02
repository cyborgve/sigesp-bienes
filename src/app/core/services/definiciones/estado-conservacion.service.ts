import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { EstadoConservacion } from '@core/models/definiciones/estado-conservacion';

@Injectable({
  providedIn: 'root',
})
export class EstadoConservacionService extends GenericService<EstadoConservacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'estadoConservacion').valor;
  }
}
