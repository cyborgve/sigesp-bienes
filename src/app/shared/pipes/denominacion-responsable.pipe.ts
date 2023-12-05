import { map, filter } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponsableService } from '@core/services/otros-modulos/responsable.service';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionResponsable',
})
export class DenominacionResponsablePipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === '') return of('');
    if (String(value) === 'Todos') return of('Todos');
    if (String(value) === '---') return of('---');
    return this._responsable.buscarPorId(value).pipe(
      filter(todo => !!todo),
      map(
        responsable =>
          `${responsable.rif} - ${responsable.nombres} ${responsable.apellidos}`
      )
    );
  }
  constructor(private _responsable: ResponsableService) {}
}
