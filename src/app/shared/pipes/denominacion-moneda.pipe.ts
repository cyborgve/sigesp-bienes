import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SigespService } from 'sigesp';
import { map } from 'rxjs/operators';
import { adaptarMonedas } from '@core/utils/operadores-rxjs';

@Pipe({
  name: 'denominacionMoneda',
})
export class DenominacionMonedaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._sigesp.getMonedas('uno', value).pipe(
      adaptarMonedas(),
      map(monedas => monedas[0].denominacion)
    );
  }

  constructor(private _sigesp: SigespService) {}
}
