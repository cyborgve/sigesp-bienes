import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { PlantillaDepreciacion } from '@core/models/plantilla-depreciacion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class PlantillaDepreciacionService extends GenericService<PlantillaDepreciacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'plantillaDepreciacion').valor;
  }
}
