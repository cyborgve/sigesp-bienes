import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { CausaMovimientoService } from '@core/services/definiciones/causa-movimiento.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'denominacionCausaMovimiento',
})
export class DenominacionCausaMovimientoPipe implements PipeTransform {
  transform(value: number): Observable<String> {
    return value
      ? this._causaMovimiento
          .buscarPorId(value)
          .pipe(
            map(causaMovimiento =>
              causaMovimiento ? causaMovimiento['denominacion'] : String(value)
            )
          )
      : undefined;
  }

  constructor(private _causaMovimiento: CausaMovimientoService) {}
}
