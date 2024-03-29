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
    if (value === null || value === undefined) return of('');
    if (value === '---') return of('---');
    if (value === 'Todos') return of('Todos');
    return this._parroquia
      .buscarPorId(value)
      .pipe(map(parroquia => parroquia['denominacion']));
  }
  constructor(private _parroquia: ParroquiaService) {}
}
