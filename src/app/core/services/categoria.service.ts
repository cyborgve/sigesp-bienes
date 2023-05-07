import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Categoria } from '@core/models/categoria';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends GenericService<Categoria> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'categoria').valor;
  }
}
