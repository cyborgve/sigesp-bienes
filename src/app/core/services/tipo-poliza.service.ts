import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TipoPoliza } from '@core/models/definiciones/tipo-poliza';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoPolizaService extends GenericService<TipoPoliza> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoPoliza').valor;
  }
}
