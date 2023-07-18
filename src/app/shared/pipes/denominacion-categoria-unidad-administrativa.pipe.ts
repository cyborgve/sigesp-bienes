import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { CategoriaUnidadAdministrativaService } from '@core/services/categoria-unidad-administrativa.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionCategoriaUnidadAdministrativa',
})
export class DenominacionCategoriaUnidadAdministrativaPipe
  implements PipeTransform
{
  transform(value: number): Observable<string> {
    return value
      ? this._categoria
          .buscarPorId(value)
          .pipe(
            map(categoria =>
              categoria ? categoria['denominacion'] : String(value)
            )
          )
      : of('no aplica');
  }
  constructor(private _categoria: CategoriaUnidadAdministrativaService) {}
}
