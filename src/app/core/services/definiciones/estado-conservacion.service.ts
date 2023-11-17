import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { EstadoConservacion } from '@core/models/definiciones/estado-conservacion';
import { Observable } from 'rxjs';
import {
  adaptarEstadoConservacion,
  adaptarEstadosConservacion,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-estado=conservacion';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class EstadoConservacionService extends GenericService<EstadoConservacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'estadoConservacion').valor;
  }

  buscarTodos(): Observable<EstadoConservacion[]> {
    return super.buscarTodos().pipe(adaptarEstadosConservacion());
  }

  buscarPorId(id: Id): Observable<EstadoConservacion> {
    return super.buscarPorId(id).pipe(adaptarEstadoConservacion());
  }

  guardar(
    entidad: EstadoConservacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<EstadoConservacion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarEstadoConservacion());
  }
}
