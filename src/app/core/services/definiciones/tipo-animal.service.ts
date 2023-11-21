import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { TipoAnimal } from '@core/models/definiciones/tipo-animal';
import { END_POINTS } from '@core/constants/end-points';
import {
  adaptarTipoAnimal,
  adaptarTiposAnimal,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-tipo-animal';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class TipoAnimalService extends GenericService<TipoAnimal> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'tipoAnimal').valor;
  }

  buscarTodos(): Observable<TipoAnimal[]> {
    return super.buscarTodos().pipe(adaptarTiposAnimal());
  }

  buscarPorId(id: Id): Observable<TipoAnimal> {
    return super.buscarPorId(id).pipe(adaptarTipoAnimal());
  }

  guardar(
    entidad: TipoAnimal,
    tipoDato: string,
    notificar?: boolean
  ): Observable<TipoAnimal> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarTipoAnimal());
  }
}
