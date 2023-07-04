import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Pipe({
  name: 'denominacionPais',
})
export class DenominacionPaisPipe implements PipeTransform {
  transform(value: string): Observable<string> {
    if (value) {
      {
        return this._sigesp.getCountries().pipe(
          map(paises => paises.find(pais => pais['code'] === String(value))),
          map(pais => (pais ? pais['name'] : String(value)))
        );
      }
    }
    return of(value);
  }

  constructor(private _sigesp: SigespService) {}
}
