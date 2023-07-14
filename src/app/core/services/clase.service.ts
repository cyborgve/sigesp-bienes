import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Clase } from '@core/models/definiciones/clase';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ClaseService extends GenericService<Clase> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'clase').valor;
  }
}
