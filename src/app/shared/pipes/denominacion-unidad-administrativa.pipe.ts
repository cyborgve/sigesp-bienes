import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { UnidadAdministrativaService } from '@core/services/unidad-administrativa.service';

@Pipe({
  name: 'denominacionUnidadAdministrativa',
})
export class DenominacionUnidadAdministrativaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._unidadAdministrativa
      .buscarPorId(value)
      .pipe(map(unidad => (unidad ? unidad['denominacion'] : String(value))));
  }
  constructor(private _unidadAdministrativa: UnidadAdministrativaService) {}
}
