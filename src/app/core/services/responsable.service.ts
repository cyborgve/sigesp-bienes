import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Responsable } from '@core/models/responsable';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ResponsableService extends GenericService<Responsable> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'responsable').valor;
  }
}
