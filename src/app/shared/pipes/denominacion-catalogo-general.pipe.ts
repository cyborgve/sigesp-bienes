import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { CatalogoGeneralService } from '@core/services/definiciones/catalogo-general.service';

@Pipe({
  name: 'denominacionCatalogoGeneral',
})
export class DenominacionCatalogoGeneralPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._catalogoGeneral
      .buscarPorId(value)
      .pipe(map(catalogoGeneral => catalogoGeneral['denominacion']));
  }
  constructor(private _catalogoGeneral: CatalogoGeneralService) {}
}
