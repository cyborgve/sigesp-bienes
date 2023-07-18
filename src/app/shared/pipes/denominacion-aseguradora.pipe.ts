import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { AseguradoraService } from '@core/services/aseguradora.service';

@Pipe({
  name: 'denominacionAseguradora',
})
export class DenominacionAseguradoraPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._aseguradora
          .buscarPorId(value)
          .pipe(
            map(aseguradora =>
              aseguradora ? aseguradora['denominacion'] : String(value)
            )
          )
      : of('no aplica');
  }
  constructor(private _aseguradora: AseguradoraService) {}
}
