import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { OrigenService } from '@core/services/origen.service';

@Pipe({
  name: 'denominacionOrigen',
})
export class DenominacionOrigenPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._origen
      .buscarPorId(value)
      .pipe(map(origen => (origen ? origen.denominacion : String(value))));
  }

  constructor(private _origen: OrigenService) {}
}
