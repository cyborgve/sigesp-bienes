import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CatalogoGeneral } from '@core/new.models/catalogo-general';

@Injectable({
  providedIn: 'root',
})
export class CatalogoGeneralService extends GenericService<CatalogoGeneral> {
  protected getEntidadUrl(): string {
    return 'catalogo-general';
  }
}
