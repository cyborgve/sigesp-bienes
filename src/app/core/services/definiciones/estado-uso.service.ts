import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { EstadoUso } from '@core/models/definiciones/estado-uso';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarEstadoUso,
  adaptarEstadosUso,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-estado-conservacion';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class EstadoUsoService extends GenericService<EstadoUso> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'estadoUso').valor;
  }

  buscarTodos(): Observable<EstadoUso[]> {
    return super.buscarTodos().pipe(adaptarEstadosUso());
  }

  buscarPorId(id: Id): Observable<EstadoUso> {
    return super.buscarPorId(id).pipe(adaptarEstadoUso());
  }

  guardar(
    entidad: EstadoUso,
    tipoDato: string,
    notificar?: boolean
  ): Observable<EstadoUso> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarEstadoUso());
  }
}
