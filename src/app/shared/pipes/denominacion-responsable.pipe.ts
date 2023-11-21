import { map, filter } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponsableService } from '@core/services/otros-modulos/responsable.service';

@Pipe({
  name: 'denominacionResponsable',
})
export class DenominacionResponsablePipe implements PipeTransform {
  transform(value: any): Observable<string> {
    if (value === null || value === '') return of('');
    if (String(value) === 'Todos') return of('Todos');
    if (String(value) === '---') return of('---');
    return this._responsable.buscarTodos().pipe(
      filter(todo => !!todo),
      map(responsables => responsables.find(res => res.id === value)),
      map(
        responsable =>
          `${responsable.rif} - ${responsable.nombre} ${responsable.apellido}`
      )
    );
  }
  constructor(private _responsable: ResponsableService) {}
}
