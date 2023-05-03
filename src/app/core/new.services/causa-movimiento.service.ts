import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CausaMovimiento } from '@core/new.models/causa-movimiento';

@Injectable({
  providedIn: 'root',
})
export class CausaMovimientoService extends GenericService<CausaMovimiento> {
  protected getEntidadUrl(): string {
    return 'causa-movimiento';
  }
}
