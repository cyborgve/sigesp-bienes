import { Injectable } from '@angular/core';
import { GenericService } from '../generic.service';
import { Modificacion } from '@core/models/procesos/modificacion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ModificacionService extends GenericService<Modificacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'modificacion').valor;
  }
}
