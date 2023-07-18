import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivoService } from '@core/services/activo.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionActivo',
})
export class DenominacionActivoPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._activo
          .buscarPorId(value)
          .pipe(
            map(activo => (activo ? activo['denominacion'] : String(value)))
          )
      : of('no aplica');
  }
  constructor(private _activo: ActivoService) {}
}
