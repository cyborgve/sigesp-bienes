import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Aseguradora } from '@core/models/aseguradora';

@Injectable({
  providedIn: 'root',
})
export class AseguradoraService extends GenericService<Aseguradora> {
  protected getEntidadUrl(): string {
    return 'dao/sbn/AseguradoraDao.php';
  }
}
