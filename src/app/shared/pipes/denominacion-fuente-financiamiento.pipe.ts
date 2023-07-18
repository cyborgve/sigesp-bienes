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
    return value
      ? this._sigesp.getFuenteFinanciamiento().pipe(
          map(fuentes =>
            fuentes.find(fuente => fuente['codigo'] === String(value))
          ),
          map(fuente =>
            fuente ? fuente['denominacionFuenteFinanciamiento'] : String(value)
          )
        )
      : of('no aplica');
  }
  constructor(private _sigesp: SigespService) {}
}
