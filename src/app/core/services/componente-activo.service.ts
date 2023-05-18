import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { ComponenteActivo } from '@core/models/componente-activo';

@Injectable({
  providedIn: 'root',
})
export class ComponenteActivoService extends GenericService<ComponenteActivo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'componenteActivo').valor;
  }
}
