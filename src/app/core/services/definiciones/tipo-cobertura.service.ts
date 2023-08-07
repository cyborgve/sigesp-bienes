import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { TipoCobertura } from '@core/models/definiciones/tipo-cobertura';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoCoberturaService extends GenericService<TipoCobertura> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoCobertura').valor;
  }
}
