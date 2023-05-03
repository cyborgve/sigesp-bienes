import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Activo } from '@core/new.models/activo';
@Injectable({
  providedIn: 'root',
})
export class ActivoService extends GenericService<Activo> {
  protected getEntidadUrl(): string {
    return 'activo';
  }
}
