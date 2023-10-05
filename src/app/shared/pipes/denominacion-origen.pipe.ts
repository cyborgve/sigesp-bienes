import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { OrigenService } from '@core/services/definiciones/origen.service';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionOrigen',
})
export class DenominacionOrigenPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._origen
      .buscarPorId(value)
      .pipe(map(origen => origen.denominacion));
  }
  constructor(private _origen: OrigenService) {}
}
