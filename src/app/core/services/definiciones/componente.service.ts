import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';

@Injectable({
  providedIn: 'root',
})
export class ComponenteService extends GenericService<ActivoComponente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoComponente').valor;
  }
}
