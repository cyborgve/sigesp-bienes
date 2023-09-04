import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SigespService } from 'sigesp';
import { map } from 'rxjs/operators';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionMoneda',
})
export class DenominacionMonedaPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._sigesp.getMonedas('uno', Number(value)).pipe(
      map(monedas => monedas[0]),
      map(moneda => (moneda ? moneda['denominacion'] : String(value)))
    );
  }
  constructor(private _sigesp: SigespService) {}
}
