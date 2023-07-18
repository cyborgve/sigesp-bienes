import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { ModeloService } from '@core/services/modelo.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionModelo',
})
export class DenominacionModeloPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._modelo
          .buscarPorId(value)
          .pipe(
            map(modelo => (modelo ? modelo['denominacion'] : String(value)))
          )
      : of('no aplica');
  }
  constructor(private _modelo: ModeloService) {}
}
