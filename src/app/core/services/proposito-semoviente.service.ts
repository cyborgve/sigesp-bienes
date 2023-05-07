import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { PropositoSemoviente } from '@core/models/proposito-semoviente';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class PropositoSemovienteService extends GenericService<PropositoSemoviente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'propositoSemoviente').valor;
  }
}
