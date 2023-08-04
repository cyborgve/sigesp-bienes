import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class CatalogoGeneralService extends GenericService<CatalogoGeneral> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(
      catalogoGeneral => catalogoGeneral.clave === 'catalogoGeneral'
    ).valor;
  }
}
