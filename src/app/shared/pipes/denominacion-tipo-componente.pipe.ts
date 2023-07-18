import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoComponenteService } from '@core/services/tipo-componente.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionTipoComponente',
})
export class DenominacionTipoComponentePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._tipoComponente
          .buscarPorId(value)
          .pipe(
            map(tipoComponente =>
              tipoComponente ? tipoComponente.denominacion : String(value)
            )
          )
      : of('no aplica');
  }
  constructor(private _tipoComponente: TipoComponenteService) {}
}
