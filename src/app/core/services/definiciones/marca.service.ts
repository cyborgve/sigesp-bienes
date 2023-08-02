import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { Marca } from '@core/models/definiciones/marca';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class MarcaService extends GenericService<Marca> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'marca').valor;
  }
}
