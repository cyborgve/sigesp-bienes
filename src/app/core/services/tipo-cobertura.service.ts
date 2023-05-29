import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TipoCobertura } from '@core/models/tipo-cobertura';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoCoberturaService extends GenericService<TipoCobertura> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoCobertura').valor;
  }
}