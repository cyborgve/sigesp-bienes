import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Categoria } from '@core/models/definiciones/categoria';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import { adaptarCategorias } from '@core/utils/pipes-rxjs/adaptadores/adaptar-categoria';
import { Id } from '@core/types/id';
import { adaptarCategoria } from '@core/utils/pipes-rxjs/adaptadores/adaptar-categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends GenericService<Categoria> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'categoria').valor;
  }

  buscarTodos(): Observable<Categoria[]> {
    return super.buscarTodos().pipe(adaptarCategorias());
  }

  buscarPorId(id: Id): Observable<Categoria> {
    return super.buscarPorId(id).pipe(adaptarCategoria());
  }

  guardar(
    entidad: Categoria,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Categoria> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarCategoria());
  }
}
