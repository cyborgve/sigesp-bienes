import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { Correlativo } from '@core/models/correlativo';

@Injectable({
  providedIn: 'root',
})
export class CorrelativoCodigosService extends GenericService<Correlativo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'correlativoCodigos').valor;
  }
}
