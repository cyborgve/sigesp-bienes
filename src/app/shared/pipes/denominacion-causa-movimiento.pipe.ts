import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { CausaMovimientoService } from '@core/services/causa-movimiento.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'denominacionCausaMovimiento',
})
export class DenominacionCausaMovimientoPipe implements PipeTransform {
  transform(value: number): Observable<String> {
    return this._causaMovimiento
      .buscarPorId(value)
      .pipe(
        map(causaMovimiento =>
          causaMovimiento ? causaMovimiento['denominacion'] : String(value)
        )
      );
  }

  constructor(private _causaMovimiento: CausaMovimientoService) {}
}
