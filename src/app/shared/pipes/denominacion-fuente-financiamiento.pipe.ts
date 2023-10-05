import { SigespService } from 'sigesp';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionFuenteFinanciamiento',
})
export class DenominacionFuenteFinanciamientoPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._sigesp.getFuenteFinanciamiento().pipe(
      map(fuentes =>
        fuentes.find(fuente => fuente['codigo'] === String(value))
      ),
      map(fuente => fuente['denominacionFuenteFinanciamiento'])
    );
  }
  constructor(private _sigesp: SigespService) {}
}
