import { Injectable } from '@angular/core';
import { Retorno } from '@core/models/procesos/retorno';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';

@Injectable({
  providedIn: 'root',
})
export class RetornoService extends GenericService<Retorno> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'retorno').valor;
  }
}
