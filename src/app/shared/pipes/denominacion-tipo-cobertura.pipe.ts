import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoCoberturaService } from '@core/services/definiciones/tipo-cobertura.service';

@Pipe({
  name: 'denominacionTipoCobertura',
})
export class DenominacionTipoCoberturaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._tipoCobertura
      .buscarPorId(value)
      .pipe(map(tipoCobertura => tipoCobertura['denominacion']));
  }
  constructor(private _tipoCobertura: TipoCoberturaService) {}
}
