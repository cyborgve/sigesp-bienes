import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivoService } from '@core/services/definiciones/activo.service';

@Pipe({
  name: 'denominacionActivo',
})
export class DenominacionActivoPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value)
      return this._activo
        .buscarPorId(value)
        .pipe(map(activo => (activo ? activo['denominacion'] : String(value))));
    return undefined;
  }
  constructor(private _activo: ActivoService) {}
}
