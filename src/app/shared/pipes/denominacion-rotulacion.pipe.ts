import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { RotulacionService } from '@core/services/rotulacion.service';

@Pipe({
  name: 'denominacionRotulacion',
})
export class DenominacionRotulacionPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._rotulacion
      .buscarPorId(value)
      .pipe(map(rotulacion => rotulacion.denominacion));
  }

  constructor(private _rotulacion: RotulacionService) {}
}
