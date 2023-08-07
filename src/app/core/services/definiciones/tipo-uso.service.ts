import { Injectable } from '@angular/core';
import { TipoUso } from '@core/models/definiciones/tipo-uso';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoUsoService extends GenericService<TipoUso> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoUso').valor;
  }
}
