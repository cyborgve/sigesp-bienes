import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivoService } from '@core/services/definiciones/activo.service';

@Pipe({
  name: 'denominacionActivo',
})
export class DenominacionActivoPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._activo
      .buscarPorId(value)
      .pipe(map(activo => activo['denominacion']));
  }
  constructor(private _activo: ActivoService) {}
}
