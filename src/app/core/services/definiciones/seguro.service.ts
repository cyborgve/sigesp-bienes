import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Seguro } from '@core/models/definiciones/seguro';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarSeguro,
  adaptarSeguros,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-seguro';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class SeguroService extends GenericService<Seguro> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'seguro').valor;
  }

  buscarTodos(): Observable<Seguro[]> {
    return super.buscarTodos().pipe(adaptarSeguros());
  }

  buscarPorId(id: Id): Observable<Seguro> {
    return super.buscarPorId(id).pipe(adaptarSeguro());
  }

  guardar(
    entidad: Seguro,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Seguro> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarSeguro());
  }
}
