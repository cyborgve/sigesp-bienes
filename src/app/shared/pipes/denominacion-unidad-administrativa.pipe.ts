import { filter, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';

@Pipe({
  name: 'denominacionUnidadAdministrativa',
})
export class DenominacionUnidadAdministrativaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._unidadAdministrativa.buscarPorId(value).pipe(
      filter(todo => !!todo),
      map(unidad => unidad['denominacion'])
    );
  }
  constructor(private _unidadAdministrativa: UnidadAdministrativaService) {}
}
