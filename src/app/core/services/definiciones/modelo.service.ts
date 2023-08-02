import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { Modelo } from '@core/models/definiciones/modelo';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ModeloService extends GenericService<Modelo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'modelo').valor;
  }
}
