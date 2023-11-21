import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { END_POINTS } from '@core/constants/end-points';
import {
  adaptarConfiguracion,
  adaptarConfiguraciones,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-configuracion';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService extends GenericService<Configuracion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'configuracion').valor;
  }

  buscarTodos(): Observable<Configuracion[]> {
    return super.buscarTodos().pipe(adaptarConfiguraciones());
  }

  buscarPorId(id: Id): Observable<Configuracion> {
    return super.buscarPorId(id).pipe(adaptarConfiguracion());
  }

  guardar(
    entidad: Configuracion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Configuracion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarConfiguracion());
  }
}
