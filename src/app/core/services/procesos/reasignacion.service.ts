import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { Reasignacion } from '@core/models/procesos/reasignacion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ReasignacionService extends GenericService<Reasignacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'reasignacion').valor;
  }
}
