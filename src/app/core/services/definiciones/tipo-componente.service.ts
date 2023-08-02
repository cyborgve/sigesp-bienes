import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { TipoComponente } from '@core/models/definiciones/tipo-componente';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoComponenteService extends GenericService<TipoComponente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoComponente').valor;
  }
}
