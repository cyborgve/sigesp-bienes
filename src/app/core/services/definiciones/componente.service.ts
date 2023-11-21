import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { Observable } from 'rxjs';
import { Id } from '@core/types/id';
import {
  adaptarActivoComponente,
  adaptarActivosComponente,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-activo-componente';

@Injectable({
  providedIn: 'root',
})
export class ComponenteService extends GenericService<ActivoComponente> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activoComponente').valor;
  }

  buscarTodos(): Observable<ActivoComponente[]> {
    return super.buscarTodos().pipe(adaptarActivosComponente());
  }

  buscarPorId(id: Id): Observable<ActivoComponente> {
    return super.buscarPorId(id).pipe(adaptarActivoComponente());
  }

  guardar(
    entidad: ActivoComponente,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ActivoComponente> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarActivoComponente());
  }
}
