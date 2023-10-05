import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { CategoriaUnidadAdministrativaService } from '@core/services/definiciones/categoria-unidad-administrativa.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionCategoriaUnidadAdministrativa',
})
export class DenominacionCategoriaUnidadAdministrativaPipe
  implements PipeTransform
{
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._categoria
      .buscarPorId(value)
      .pipe(map(categoria => categoria['denominacion']));
  }
  constructor(private _categoria: CategoriaUnidadAdministrativaService) {}
}
