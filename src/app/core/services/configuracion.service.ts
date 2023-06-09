import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Configuracion } from '@core/models/configuracion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService extends GenericService<Configuracion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'configuracion').valor;
  }
}
