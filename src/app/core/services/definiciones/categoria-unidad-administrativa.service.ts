import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import { Id } from '@core/types/id';
import {
  adaptarCategoriaUnidadAdministrativa,
  adaptarCategoriasUnidadAdministrativas,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-categoria-unidad-administrativa';
import { CategoriaUnidadAdministrativa } from '@core/models/definiciones/categoria-unidad-administrativa';

@Injectable({
  providedIn: 'root',
})
export class CategoriaUnidadAdministrativaService extends GenericService<CategoriaUnidadAdministrativa> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'categoriaUnidadAdministrativa')
      .valor;
  }

  buscarTodos(): Observable<CategoriaUnidadAdministrativa[]> {
    return super.buscarTodos().pipe(adaptarCategoriasUnidadAdministrativas());
  }

  buscarPorId(id: Id): Observable<CategoriaUnidadAdministrativa> {
    return super.buscarPorId(id).pipe(adaptarCategoriaUnidadAdministrativa());
  }

  guardar(
    entidad: CategoriaUnidadAdministrativa,
    tipoDato: string,
    notificar?: boolean
  ): Observable<CategoriaUnidadAdministrativa> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarCategoriaUnidadAdministrativa());
  }
}
