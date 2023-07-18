import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ParroquiaService } from '@core/services/otros-modulos/parroquia.service';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionParroquia',
})
export class DenominacionParroquiaPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return value
      ? this._parroquia.buscarTodos().pipe(
          map(parroquias => parroquias.find(p => p.id === String(value))),
          map(parroquia =>
            parroquia ? parroquia['denominacion'] : String(value)
          )
        )
      : of('no aplica');
  }
  constructor(private _parroquia: ParroquiaService) {}
}
