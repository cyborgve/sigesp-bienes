import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { CategoriaService } from '@core/services/definiciones/categoria.service';

@Pipe({
  name: 'denominacionCategoria',
})
export class DenominacionCategoriaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._categoria
      .buscarPorId(value)
      .pipe(
        map(categoria =>
          categoria ? categoria['denominacion'] : String(value)
        )
      );
  }
  constructor(private _categoria: CategoriaService) {}
}
