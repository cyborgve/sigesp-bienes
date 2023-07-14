import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ActivoComponenteService extends GenericService<ActivoComponente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoComponente').valor;
  }
}
