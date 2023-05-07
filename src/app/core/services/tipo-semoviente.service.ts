import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TipoSemoviente } from '@core/models/tipo-semoviente';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoSemovienteService extends GenericService<TipoSemoviente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoSemoviente').valor;
  }
}
