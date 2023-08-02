import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/definiciones/generic.service';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { END_POINTS } from '@core/constants/end-points';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionSalidaService extends GenericService<AutorizacionSalida> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'autorizacionSalida').valor;
  }
}
