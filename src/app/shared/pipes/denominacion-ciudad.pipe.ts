import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';
import { CiudadService } from '@core/services/otros-modulos/ciudad.service';

@Pipe({
  name: 'denominacionCiudad',
})
export class DenominacionCiudadPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === '---') return of('---');
    if (value === '--') return of('---');
    if (value === 'Todos') return of('Todos');
    return this._ciudad
      .buscarPorId(value)
      .pipe(map(ciudad => ciudad['denominacion']));
  }

  constructor(private _ciudad: CiudadService) {}
}
