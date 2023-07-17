import { Injectable } from '@angular/core';
import { GenericService } from '../generic.service';
import { Retorno } from '@core/models/procesos/retorno';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class RetornoService extends GenericService<Retorno> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'retorno').valor;
  }
}
