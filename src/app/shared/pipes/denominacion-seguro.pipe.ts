import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SeguroService } from '@core/services/definiciones/seguro.service';

@Pipe({
  name: 'denominacionSeguro',
})
export class DenominacionSeguroPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._seguro
      .buscarPorId(value)
      .pipe(map(seguro => seguro['denominacion']));
  }

  constructor(private _seguro: SeguroService) {}
}
