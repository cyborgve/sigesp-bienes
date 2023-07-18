import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SeguroService } from '@core/services/seguro.service';

@Pipe({
  name: 'denominacionSeguro',
})
export class DenominacionSeguroPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._seguro
          .buscarPorId(value)
          .pipe(
            map(seguro => (seguro ? seguro['denominacion'] : String[value]))
          )
      : of('no aplica');
  }

  constructor(private _seguro: SeguroService) {}
}
