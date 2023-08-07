import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class CambioResponsableService extends GenericService<CambioResponsable> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'cambioResponsable').valor;
  }
}
