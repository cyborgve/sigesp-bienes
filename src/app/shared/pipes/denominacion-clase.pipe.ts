import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ClaseService } from '@core/services/clase.service';

@Pipe({
  name: 'denominacionClase',
})
export class DenominacionClasePipe implements PipeTransform {
  p;
  transform(value: number): Observable<string> {
    return value
      ? this._clase
          .buscarPorId(value)
          .pipe(map(clase => (clase ? clase['denominacion'] : String(value))))
      : of('no aplica');
  }
  constructor(private _clase: ClaseService) {}
}
