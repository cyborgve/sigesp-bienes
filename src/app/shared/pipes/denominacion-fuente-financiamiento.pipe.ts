import { SigespService } from 'sigesp';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionFuenteFinanciamiento',
})
export class DenominacionFuenteFinanciamientoPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._sigesp.getFuenteFinanciamiento().pipe(
      map(fuentes =>
        fuentes.find(fuente => fuente['codigo'] === String(value))
      ),
      map(fuente =>
        fuente ? fuente['denominacionFuenteFinanciamiento'] : String(value)
      )
    );
  }
  constructor(private _sigesp: SigespService) {}
}
