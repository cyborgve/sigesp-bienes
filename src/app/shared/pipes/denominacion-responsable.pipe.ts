import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Id } from '@core/types/id';
import { ResponsableService } from '@core/services/otros-modulos/responsable.service';

@Pipe({
  name: 'denominacionResponsable',
})
export class DenominacionResponsablePipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === '--' || value === '---') return of('---');
    if (value !== '---' && value !== '')
      return this._responsable.buscarTodos().pipe(
        map(responsables => responsables.find(res => res.id === value)),
        map(
          responsable =>
            `${responsable.rif} - ${responsable.nombre} ${responsable.apellido}`
        )
      );
  }
  constructor(private _responsable: ResponsableService) {}
}
