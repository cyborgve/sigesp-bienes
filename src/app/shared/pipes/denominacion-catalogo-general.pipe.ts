import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { CatalogoGeneralService } from '@core/services/definiciones/catalogo-general.service';

@Pipe({
  name: 'denominacionCatalogoGeneral',
})
export class DenominacionCatalogoGeneralPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._catalogoGeneral
      .buscarPorId(value)
      .pipe(
        map(catalogoGeneral =>
          catalogoGeneral ? catalogoGeneral['catalogoCuentas'] : String(value)
        )
      );
  }
  constructor(private _catalogoGeneral: CatalogoGeneralService) {}
}
