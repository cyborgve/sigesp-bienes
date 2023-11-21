import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { Observable } from 'rxjs';
import {
  adaptarUnidadAdministrativa,
  adaptarUnidadesAdministrativas,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-unidad-administrativa';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class UnidadAdministrativaService extends GenericService<UnidadAdministrativa> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'unidadAdministrativa').valor;
  }

  buscarTodos(): Observable<UnidadAdministrativa[]> {
    return super.buscarTodos().pipe(adaptarUnidadesAdministrativas());
  }

  buscarPorId(id: Id): Observable<UnidadAdministrativa> {
    return super.buscarPorId(id).pipe(adaptarUnidadAdministrativa());
  }

  guardar(
    entidad: UnidadAdministrativa,
    tipoDato: string,
    notificar?: boolean
  ): Observable<UnidadAdministrativa> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarUnidadAdministrativa());
  }
}
