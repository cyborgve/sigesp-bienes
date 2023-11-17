import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Raza } from '@core/models/definiciones/raza';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import {
  adaptarRaza,
  adaptarRazas,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-raza';

@Injectable({
  providedIn: 'root',
})
export class RazaService extends GenericService<Raza> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'raza').valor;
  }

  buscarTodos(): Observable<Raza[]> {
    return super.buscarTodos().pipe(adaptarRazas());
  }

  buscarPorId(id: Id): Observable<Raza> {
    return super.buscarPorId(id).pipe(adaptarRaza());
  }

  guardar(
    entidad: Raza,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Raza> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarRaza());
  }
}
