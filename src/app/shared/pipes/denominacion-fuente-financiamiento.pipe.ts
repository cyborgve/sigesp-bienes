import { SigespService } from 'sigesp';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionFuenteFinanciamiento',
})
export class DenominacionFuenteFinanciamientoPipe implements PipeTransform {
  transform(value: any): Observable<string> {
    return this._sigesp
      .getFuenteFinanciamiento()
      .pipe(
        map(
          fuentes =>
            fuentes.find(
              fuente => fuente.codigoFuenteFinanciamiento === String(value)
            ).denominacionFuenteFinanciamiento
        )
      );
  }

  constructor(private _sigesp: SigespService) {}
}
