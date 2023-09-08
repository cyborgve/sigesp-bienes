import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { TipoSede } from '@core/models/definiciones/tipo-sede';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class TipoSedeService extends GenericService<TipoSede> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoSede').valor;
  }
}