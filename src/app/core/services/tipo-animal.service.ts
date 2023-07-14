import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TipoAnimal } from '@core/models/definiciones/tipo-animal';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoAnimalService extends GenericService<TipoAnimal> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoAnimal').valor;
  }
}
