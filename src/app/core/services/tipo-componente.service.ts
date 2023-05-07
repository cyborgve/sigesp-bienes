import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TipoComponente } from '@core/models/tipo-componente';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoComponenteService extends GenericService<TipoComponente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoComponente').valor;
  }
}
