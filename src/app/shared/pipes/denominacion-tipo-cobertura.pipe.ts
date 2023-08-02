import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoCoberturaService } from '@core/services/definiciones/tipo-cobertura.service';

@Pipe({
  name: 'denominacionTipoCobertura',
})
export class DenominacionTipoCoberturaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._tipoCobertura
      .buscarPorId(value)
      .pipe(
        map(tipoCobertura =>
          tipoCobertura ? tipoCobertura['denominacion'] : String(value)
        )
      );
  }
  constructor(private _tipoCobertura: TipoCoberturaService) {}
}
