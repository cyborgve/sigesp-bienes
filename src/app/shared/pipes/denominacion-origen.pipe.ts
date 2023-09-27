import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { OrigenService } from '@core/services/definiciones/origen.service';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionOrigen',
})
export class DenominacionOrigenPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._origen
      .buscarPorId(value)
      .pipe(map(origen => (origen ? origen.denominacion : String(value))));
  }
  constructor(private _origen: OrigenService) {}
}
