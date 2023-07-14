import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from './generic.service';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

@Injectable({
  providedIn: 'root',
})
export class ActivoUbicacionService extends GenericService<ActivoUbicacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoUbicacion').valor;
  }
}
