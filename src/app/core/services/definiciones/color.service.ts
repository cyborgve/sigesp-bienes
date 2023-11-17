import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Color } from '@core/models/definiciones/color';
import { END_POINTS } from '@core/constants/end-points';
import { adaptarColor } from '@core/utils/pipes-rxjs/adaptadores/adaptar-color';
import { Observable } from 'rxjs';
import { Id } from '@core/types/id';
import { adaptarColores } from '@core/utils/pipes-rxjs/adaptadores/adaptar-color';

@Injectable({
  providedIn: 'root',
})
export class ColorService extends GenericService<Color> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'color').valor;
  }

  buscarTodos(): Observable<Color[]> {
    return super.buscarTodos().pipe(adaptarColores());
  }

  buscarPorId(id: Id): Observable<Color> {
    return super.buscarPorId(id).pipe(adaptarColor());
  }

  guardar(
    entidad: Color,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Color> {
    return super.guardar(entidad, tipoDato, notificar).pipe(adaptarColor());
  }
}
