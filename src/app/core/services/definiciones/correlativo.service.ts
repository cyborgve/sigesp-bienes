import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { Correlativo } from '@core/models/definiciones/correlativo';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class CorrelativoService extends GenericService<Correlativo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'correlativo').valor;
  }
}
