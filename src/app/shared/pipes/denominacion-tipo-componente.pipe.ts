import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoComponenteService } from '@core/services/definiciones/tipo-componente.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'denominacionTipoComponente',
})
export class DenominacionTipoComponentePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._tipoComponente
      .buscarPorId(value)
      .pipe(
        map(tipoComponente =>
          tipoComponente ? tipoComponente.denominacion : String(value)
        )
      );
  }
  constructor(private _tipoComponente: TipoComponenteService) {}
}
