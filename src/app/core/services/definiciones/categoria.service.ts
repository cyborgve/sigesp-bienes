import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Categoria } from '@core/models/definiciones/categoria';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends GenericService<Categoria> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'categoria').valor;
  }
}
