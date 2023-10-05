import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { RotulacionService } from '@core/services/definiciones/rotulacion.service';

@Pipe({
  name: 'denominacionRotulacion',
})
export class DenominacionRotulacionPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._rotulacion
      .buscarPorId(value)
      .pipe(map(rotulacion => rotulacion['denominacion']));
  }

  constructor(private _rotulacion: RotulacionService) {}
}
