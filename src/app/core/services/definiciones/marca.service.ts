import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Marca } from '@core/models/definiciones/marca';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarMarca,
  adaptarMarcas,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-marca';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class MarcaService extends GenericService<Marca> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'marca').valor;
  }

  buscarTodos(): Observable<Marca[]> {
    return super.buscarTodos().pipe(adaptarMarcas());
  }

  buscarPorId(id: Id): Observable<Marca> {
    return super.buscarPorId(id).pipe(adaptarMarca());
  }

  guardar(
    entidad: Marca,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Marca> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarMarca());
  }
}
