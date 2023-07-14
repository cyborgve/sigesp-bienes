import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CategoriaUnidadAdministrativa } from '@core/models/definiciones/categoria-unidad-administrativa';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class CategoriaUnidadAdministrativaService extends GenericService<CategoriaUnidadAdministrativa> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'categoriaUnidadAdministrativa')
      .valor;
  }
}
