import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Activo } from '@core/models/activo';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ActivoService extends GenericService<Activo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activo').valor;
  }
}
