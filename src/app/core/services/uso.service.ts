import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Uso } from '@core/models/uso';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class UsoService extends GenericService<Uso> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'uso').valor;
  }
}
