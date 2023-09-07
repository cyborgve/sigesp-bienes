import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { Id } from '@core/types/id';
import { MonedaService } from '@core/services/otros-modulos/moneda.service';

@Pipe({
  name: 'denominacionMoneda',
})
export class DenominacionMonedaPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._moneda
      .buscarPorId(value)
      .pipe(map(moneda => (moneda ? moneda['denominacion'] : String(value))));
  }
  constructor(private _moneda: MonedaService) {}
}
