import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { SedeService } from '@core/services/sede.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionSede',
})
export class DenominacionSedePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._sede
          .buscarPorId(value)
          .pipe(map(sede => (sede ? sede['denominacion'] : String(value))))
      : of('no aplica');
  }

  constructor(private _sede: SedeService) {}
}
