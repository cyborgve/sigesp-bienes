import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';

@Injectable({
  providedIn: 'root',
})
export class UnidadAdministrativaService extends GenericService<UnidadAdministrativa> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'unidadAdministrativa').valor;
  }
}
