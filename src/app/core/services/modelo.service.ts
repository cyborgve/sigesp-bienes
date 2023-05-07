import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Modelo } from '@core/models/modelo';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ModeloService extends GenericService<Modelo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'modelo').valor;
  }
}
