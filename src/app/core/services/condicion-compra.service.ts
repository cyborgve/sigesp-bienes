import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CondicionCompra } from '@core/models/condicion-compra';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class CondicionCompraService extends GenericService<CondicionCompra> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'condicionCompra').valor;
  }
}
