import { Pipe, PipeTransform } from '@angular/core';
import { TipoSedeService } from '@core/services/definiciones/tipo-sede.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionTipoSede',
})
export class DenominacionTipoSedePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._tipoSede
      .buscarPorId(value)
      .pipe(map(tipoSede => tipoSede['denominacion']));
  }

  constructor(private _tipoSede: TipoSedeService) {}
}
