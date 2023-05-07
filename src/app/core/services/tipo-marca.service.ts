import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TipoMarca } from '@core/models/tipo-marca';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoMarcaService extends GenericService<TipoMarca> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoMarca').valor;
  }
}
