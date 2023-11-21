import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Sede } from '@core/models/definiciones/sede';
import { END_POINTS } from '@core/constants/end-points';
import {
  adaptarSede,
  adaptarSedes,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-sede';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class SedeService extends GenericService<Sede> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'sede').valor;
  }

  buscarTodos(): Observable<Sede[]> {
    return super.buscarTodos().pipe(adaptarSedes());
  }

  buscarPorId(id: Id): Observable<Sede> {
    return super.buscarPorId(id).pipe(adaptarSede());
  }

  guardar(
    entidad: Sede,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Sede> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarSede());
  }
}
