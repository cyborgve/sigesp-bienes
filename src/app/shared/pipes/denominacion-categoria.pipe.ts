import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { CategoriaService } from '@core/services/categoria.service';

@Pipe({
  name: 'denominacionCategoria',
})
export class DenominacionCategoriaPipe implements PipeTransform {
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
  constructor(private _categoria: CategoriaService) {}
}
