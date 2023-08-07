import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Raza } from '@core/models/definiciones/raza';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class RazaService extends GenericService<Raza> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'raza').valor;
  }
}
