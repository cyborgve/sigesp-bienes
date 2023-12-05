import { Pipe, PipeTransform } from '@angular/core';
import { PaisService } from '@core/services/otros-modulos/pais.service';
import { Id } from '@core/types/id';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionPais',
})
export class DenominacionPaisPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === '---') return of('---');
    return this._pais.buscarPorId(value).pipe(map(pais => pais.denominacion));
  }

  constructor(private _pais: PaisService) {}
}
