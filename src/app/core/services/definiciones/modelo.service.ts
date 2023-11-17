import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Modelo } from '@core/models/definiciones/modelo';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarModelo,
  adaptarModelos,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-modelo';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class ModeloService extends GenericService<Modelo> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'modelo').valor;
  }

  buscarTodos(): Observable<Modelo[]> {
    return super.buscarTodos().pipe(adaptarModelos());
  }

  buscarPorId(id: Id): Observable<Modelo> {
    return super.buscarPorId(id).pipe(adaptarModelo());
  }

  guardar(
    entidad: Modelo,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Modelo> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarModelo());
  }
}
