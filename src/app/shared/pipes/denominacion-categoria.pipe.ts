import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { CategoriaService } from '@core/services/definiciones/categoria.service';

@Pipe({
  name: 'denominacionCategoria',
})
export class DenominacionCategoriaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._categoria
      .buscarPorId(value)
      .pipe(map(categoria => categoria['denominacion']));
  }
  constructor(private _categoria: CategoriaService) {}
}
