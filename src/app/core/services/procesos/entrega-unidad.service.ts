import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class EntregaUnidadService extends GenericService<EntregaUnidad> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'entregaUnidad').valor;
  }
}
