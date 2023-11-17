import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Origen } from '@core/models/definiciones/origen';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarOrigen,
  adaptarOrigenes,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-origen';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class OrigenService extends GenericService<Origen> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'origen').valor;
  }

  buscarTodos(): Observable<Origen[]> {
    return super.buscarTodos().pipe(adaptarOrigenes());
  }

  buscarPorId(id: Id): Observable<Origen> {
    return super.buscarPorId(id).pipe(adaptarOrigen());
  }

  guardar(
    entidad: Origen,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Origen> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarOrigen());
  }
}
