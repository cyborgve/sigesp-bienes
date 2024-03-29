import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { EstadoService } from '@core/services/otros-modulos/estado.service';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionEstado',
})
export class DenominacionEstadoPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === '---') return of('---');
    if (value === 'Todos') return of('Todos');
    return this._estado
      .buscarPorId(value)
      .pipe(map(estado => estado['denominacion']));
  }
  constructor(private _estado: EstadoService) {}
}
