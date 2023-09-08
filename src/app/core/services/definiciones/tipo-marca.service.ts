import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { TipoMarca } from '@core/models/definiciones/tipo-marca';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoMarcaService extends GenericService<TipoMarca> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoMarca').valor;
  }
}