import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { EstadoUsoService } from '@core/services/estado-uso.service';

@Pipe({
  name: 'denominacionEstadoUso',
})
export class DenominacionEstadoUsoPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._estadoUso
          .buscarPorId(value)
          .pipe(
            map(estadoUso =>
              estadoUso ? estadoUso['denominacion'] : String(value)
            )
          )
      : of('no aplica');
  }

  constructor(private _estadoUso: EstadoUsoService) {}
}
