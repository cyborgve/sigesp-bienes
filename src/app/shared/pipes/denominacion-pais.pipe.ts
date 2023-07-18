import { Pipe, PipeTransform } from '@angular/core';
import { PaisService } from '@core/services/otros-modulos/pais.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionPais',
})
export class DenominacionPaisPipe implements PipeTransform {
  transform(value: string): Observable<string> {
    if (value) {
      {
        return value
          ? this._pais.buscarTodos().pipe(
              map(paises => paises.find(pais => pais.id === value)),
              map(pais => (pais ? pais['denominacion'] : String(value)))
            )
          : of('no aplica');
      }
    }
  }

  constructor(private _pais: PaisService) {}
}
