import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TipoSede } from '@core/models/tipo-sede';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoSedeService extends GenericService<TipoSede> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoSede').valor;
  }
}
