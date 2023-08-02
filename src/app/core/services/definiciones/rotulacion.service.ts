import { Injectable } from '@angular/core';
import { Rotulacion } from '@core/models/definiciones/rotulacion';
import { GenericService } from '@core/services/definiciones/generic.service';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class RotulacionService extends GenericService<Rotulacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'rotulacion').valor;
  }
}
