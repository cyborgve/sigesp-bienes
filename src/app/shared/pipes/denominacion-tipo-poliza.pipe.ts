import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoPolizaService } from '@core/services/tipo-poliza.service';

@Pipe({
  name: 'denominacionTipoPoliza',
})
export class DenominacionTipoPolizaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._tipoPoliza
          .buscarPorId(value)
          .pipe(
            map(tipoPoliza =>
              tipoPoliza ? tipoPoliza['denominacion'] : String(value)
            )
          )
      : of('no aplica');
  }
  constructor(private _tipoPoliza: TipoPolizaService) {}
}
