import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { PropositoSemoviente } from '@core/models/definiciones/proposito-semoviente';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class PropositoSemovienteService extends GenericService<PropositoSemoviente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'propositoSemoviente').valor;
  }
}
