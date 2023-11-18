import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { Id } from '@core/types/id';
import { MonedaService } from '@core/services/otros-modulos/moneda.service';

@Pipe({
  name: 'denominacionMoneda',
})
export class DenominacionMonedaPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._moneda
      .buscarPorId(value)
      .pipe(map(moneda => moneda['denominacion']));
  }
  constructor(private _moneda: MonedaService) {}
}
