import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { PlantillaDepreciacion } from '@core/models/definiciones/plantilla-depreciacion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class PlantillaDepreciacionService extends GenericService<PlantillaDepreciacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'plantillaDepreciacion').valor;
  }
}
