import { Injectable } from '@angular/core';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';

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
