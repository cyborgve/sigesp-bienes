import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SeguroService } from '@core/services/seguro.service';

@Pipe({
  name: 'denominacionSeguro',
})
export class DenominacionSeguroPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._seguro
      .buscarPorId(value)
      .pipe(map(seguro => seguro.denominacion));
  }

  constructor(private _seguro: SeguroService) {}
}
