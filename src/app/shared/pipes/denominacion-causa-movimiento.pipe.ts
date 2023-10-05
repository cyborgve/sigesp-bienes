import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { CausaMovimientoService } from '@core/services/definiciones/causa-movimiento.service';
import { Observable, of } from 'rxjs';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionCausaMovimiento',
})
export class DenominacionCausaMovimientoPipe implements PipeTransform {
  transform(value: Id): Observable<String> {
    if (value === null || value === undefined) return of('');
    if (value === '') return of('');
    return this._causaMovimiento
      .buscarPorId(value)
      .pipe(map(causaMovimiento => causaMovimiento['denominacion']));
  }

  constructor(private _causaMovimiento: CausaMovimientoService) {}
}
