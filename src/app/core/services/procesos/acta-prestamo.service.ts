import { Injectable } from '@angular/core';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';

@Injectable({
  providedIn: 'root',
})
export class ActaPrestamoService extends GenericService<ActaPrestamo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'actaPrestamo').valor;
  }
}
