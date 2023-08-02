import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { RotulacionService } from '@core/services/definiciones/rotulacion.service';

@Pipe({
  name: 'denominacionRotulacion',
})
export class DenominacionRotulacionPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._rotulacion
      .buscarPorId(value)
      .pipe(
        map(rotulacion =>
          rotulacion ? rotulacion['denominacion'] : String(value)
        )
      );
  }

  constructor(private _rotulacion: RotulacionService) {}
}
