import { Pipe, PipeTransform } from '@angular/core';
import { TipoSedeService } from '@core/services/tipo-sede.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionTipoSede',
})
export class DenominacionTipoSedePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._tipoSede
      .buscarPorId(value)
      .pipe(
        map(tipoSede => (tipoSede ? tipoSede['denominacion'] : String(value)))
      );
  }

  constructor(private _tipoSede: TipoSedeService) {}
}
