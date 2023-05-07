import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { EstadoUso } from '@core/models/estado-uso';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class EstadoUsoService extends GenericService<EstadoUso> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'estadoUso').valor;
  }
}
