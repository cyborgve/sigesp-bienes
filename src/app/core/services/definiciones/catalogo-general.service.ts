import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Observable } from 'rxjs';
import { adaptarCatalogosGenerales } from '@core/utils/pipes-rxjs/adaptadores/adaptar-catalogo-general';
import { Id } from '@core/types/id';
import { adaptarCatalogoGeneral } from '@core/utils/pipes-rxjs/adaptadores/adaptar-catalogo-general';

@Injectable({
  providedIn: 'root',
})
export class CatalogoGeneralService extends GenericService<CatalogoGeneral> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(
      catalogoGeneral => catalogoGeneral.clave === 'catalogoGeneral'
    ).valor;
  }

  buscarTodos(): Observable<CatalogoGeneral[]> {
    return super.buscarTodos().pipe(adaptarCatalogosGenerales());
  }

  buscarPorId(id: Id): Observable<CatalogoGeneral> {
    return super.buscarPorId(id).pipe(adaptarCatalogoGeneral());
  }

  guardar(
    entidad: CatalogoGeneral,
    tipoDato: string,
    notificar?: boolean
  ): Observable<CatalogoGeneral> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarCatalogoGeneral());
  }
}
