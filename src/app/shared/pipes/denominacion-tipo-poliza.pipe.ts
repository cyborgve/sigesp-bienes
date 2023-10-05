import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoPolizaService } from '@core/services/definiciones/tipo-poliza.service';

@Pipe({
  name: 'denominacionTipoPoliza',
})
export class DenominacionTipoPolizaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._tipoPoliza
      .buscarPorId(value)
      .pipe(map(tipoPoliza => tipoPoliza['denominacion']));
  }
  constructor(private _tipoPoliza: TipoPolizaService) {}
}
