import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { RotulacionService } from '@core/services/rotulacion.service';

@Pipe({
  name: 'denominacionRotulacion',
})
export class DenominacionRotulacionPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._rotulacion
          .buscarPorId(value)
          .pipe(
            map(rotulacion =>
              rotulacion ? rotulacion['denominacion'] : String(value)
            )
          )
      : of('no aplica');
  }

  constructor(private _rotulacion: RotulacionService) {}
}
