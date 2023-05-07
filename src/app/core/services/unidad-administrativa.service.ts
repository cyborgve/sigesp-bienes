import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { UnidadAdministrativa } from '@core/models/unidad-administrativa';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class UnidadAdministrativaService extends GenericService<UnidadAdministrativa> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'unidadAdministrativa').valor;
  }
}
