import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { END_POINTS } from '@core/constants/end-points';
import { adaptarCausaMovimiento } from '@core/utils/pipes-rxjs/adaptadores/adaptar-causa-movimiento';
import { adaptarCausasMovimiento } from '@core/utils/pipes-rxjs/adaptadores/adaptar-causa-movimiento';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class CausaMovimientoService extends GenericService<CausaMovimiento> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'causaMovimiento').valor;
  }

  buscarTodos(): Observable<CausaMovimiento[]> {
    return super.buscarTodos().pipe(adaptarCausasMovimiento());
  }

  buscarPorId(id: Id): Observable<CausaMovimiento> {
    return super.buscarPorId(id).pipe(adaptarCausaMovimiento());
  }

  guardar(
    entidad: CausaMovimiento,
    tipoDato: string,
    notificar?: boolean
  ): Observable<CausaMovimiento> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarCausaMovimiento());
  }
}
