import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ClaseService } from '@core/services/definiciones/clase.service';

@Pipe({
  name: 'denominacionClase',
})
export class DenominacionClasePipe implements PipeTransform {
  p;
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._clase
      .buscarPorId(value)
      .pipe(map(clase => clase['denominacion']));
  }
  constructor(private _clase: ClaseService) {}
}
