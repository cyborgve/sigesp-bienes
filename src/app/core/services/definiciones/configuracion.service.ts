import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService extends GenericService<Configuracion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'configuracion').valor;
  }
}
