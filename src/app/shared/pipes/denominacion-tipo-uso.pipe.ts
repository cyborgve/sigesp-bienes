import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoUsoService } from '@core/services/definiciones/tipo-uso.service';

@Pipe({
  name: 'denominacionTipoUso',
})
export class DenominacionTipoUsoPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._tipoUso
      .buscarPorId(value)
      .pipe(map(tipo => tipo['denominacion']));
  }

  constructor(private _tipoUso: TipoUsoService) {}
}
