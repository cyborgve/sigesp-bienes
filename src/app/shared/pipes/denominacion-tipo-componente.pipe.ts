import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoComponenteService } from '@core/services/definiciones/tipo-componente.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionTipoComponente',
})
export class DenominacionTipoComponentePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._tipoComponente
      .buscarPorId(value)
      .pipe(map(tipoComponente => tipoComponente.denominacion));
  }
  constructor(private _tipoComponente: TipoComponenteService) {}
}
