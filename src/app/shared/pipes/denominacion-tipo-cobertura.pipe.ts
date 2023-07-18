import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoCoberturaService } from '@core/services/tipo-cobertura.service';

@Pipe({
  name: 'denominacionTipoCobertura',
})
export class DenominacionTipoCoberturaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._tipoCobertura
          .buscarPorId(value)
          .pipe(
            map(tipoCobertura =>
              tipoCobertura ? tipoCobertura['denominacion'] : String(value)
            )
          )
      : of('no aplica');
  }
  constructor(private _tipoCobertura: TipoCoberturaService) {}
}
