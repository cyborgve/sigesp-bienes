import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Id } from '@core/types/id';
import { ResponsableService } from '@core/services/otros-modulos/responsable.service';

@Pipe({
  name: 'denominacionResponsable',
})
export class DenominacionResponsablePipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._responsable.buscarTodos().pipe(
      map(responsables => responsables.find(res => res.id === value)),
      map(responsable =>
        responsable
          ? `${responsable.rif} - ${responsable.nombre} ${responsable.apellido}`
          : String(value)
      )
    );
  }
  constructor(private _responsable: ResponsableService) {}
}
