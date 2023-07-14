import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Aseguradora } from '@core/models/definiciones/aseguradora';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class AseguradoraService extends GenericService<Aseguradora> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'aseguradoras').valor;
  }
}
