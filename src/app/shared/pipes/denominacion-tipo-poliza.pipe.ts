import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoPolizaService } from '@core/services/tipo-poliza.service';

@Pipe({
  name: 'denominacionTipoPoliza',
})
export class DenominacionTipoPolizaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._tipoPoliza
      .buscarPorId(value)
      .pipe(
        map(tipoPoliza =>
          tipoPoliza ? tipoPoliza['denominacion'] : String(value)
        )
      );
  }
  constructor(private _tipoPoliza: TipoPolizaService) {}
}
