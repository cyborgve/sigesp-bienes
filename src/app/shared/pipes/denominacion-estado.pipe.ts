import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { EstadoService } from '@core/services/otros-modulos/estado.service';

@Pipe({
  name: 'denominacionEstado',
})
export class DenominacionEstadoPipe implements PipeTransform {
  transform(value: string): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === 'Todos') return of('Todos');
    return this._estado.buscarTodos().pipe(
      map(estados => estados.find(e => e.id === value)),
      map(estado => estado['denominacion'])
    );
  }
  constructor(private _estado: EstadoService) {}
}
