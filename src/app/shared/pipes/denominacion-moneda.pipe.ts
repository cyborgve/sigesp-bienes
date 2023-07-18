import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SigespService } from 'sigesp';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionMoneda',
})
export class DenominacionMonedaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._sigesp.getMonedas('uno', value).pipe(
          map(monedas => monedas[0]),
          map(moneda => (moneda ? moneda['denominacion'] : String(value)))
        )
      : of('no aplica');
  }
  constructor(private _sigesp: SigespService) {}
}
