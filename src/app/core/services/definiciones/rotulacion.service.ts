import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Rotulacion } from '@core/models/definiciones/rotulacion';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import {
  adaptarRotulacion,
  adaptarRotulaciones,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-rotulacion';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class RotulacionService extends GenericService<Rotulacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'rotulacion').valor;
  }

  buscarTodos(): Observable<Rotulacion[]> {
    return super.buscarTodos().pipe(adaptarRotulaciones());
  }

  buscarPorId(id: Id): Observable<Rotulacion> {
    return super.buscarPorId(id).pipe(adaptarRotulacion());
  }

  guardar(
    entidad: Rotulacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Rotulacion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarRotulacion());
  }
}
