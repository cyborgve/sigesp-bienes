import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { CategoriaUnidadAdministrativaService } from '@core/services/categoria-unidad-administrativa.service';

@Pipe({
  name: 'denominacionCategoriaUnidadAdministrativa',
})
export class DenominacionCategoriaUnidadAdministrativaPipe
  implements PipeTransform
{
  transform(value: number): Observable<string> {
    return this._categoriaUnidadAdministrativa
      .buscarPorId(value)
      .pipe(
        map(categoria =>
          categoria ? categoria['denominacion'] : String(value)
        )
      );
  }
  constructor(
    private _categoriaUnidadAdministrativa: CategoriaUnidadAdministrativaService
  ) {}
}
