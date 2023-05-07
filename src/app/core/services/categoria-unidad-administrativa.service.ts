import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CategoriaUnidadAdministr } from '@core/models/categoria-unidad-administrativa';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class CategoriaUnidadAdministrativaService extends GenericService<CategoriaUnidadAdministr> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'categoriaUnidadAdministrativa')
      .valor;
  }
}
