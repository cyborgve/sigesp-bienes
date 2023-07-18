import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { EstadoService } from '@core/services/otros-modulos/estado.service';

@Pipe({
  name: 'denominacionEstado',
})
export class DenominacionEstadoPipe implements PipeTransform {
  transform(value: string): Observable<string> {
    return value
      ? this._estado.buscarTodos().pipe(
          map(estados => estados.find(e => e.id === value)),
          map(estado => (estado ? estado['denominacion'] : String(value)))
        )
      : of('no aplica');
  }
  constructor(private _estado: EstadoService) {}
}
