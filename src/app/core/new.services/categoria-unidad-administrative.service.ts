import { CategoriaUnidadAdministrativa } from '@core/new.models/categoria-unidad-administrativa';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaUnidadAdministrativeService extends GenericService<CategoriaUnidadAdministrativa> {
  protected getEntidadUrl(): string {
    return 'categorias-unidad-administrativa';
  }
}
