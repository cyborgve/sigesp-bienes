import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CausaMovimiento } from '@core/models/causa-movimiento';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class CausaMovimientoService extends GenericService<CausaMovimiento> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'causaMovimiento').valor;
  }
}
