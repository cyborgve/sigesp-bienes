import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Color } from '@core/models/definiciones/color';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ColorService extends GenericService<Color> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'color').valor;
  }
}
