import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { EstadoConservacionService } from '@core/services/estado-conservacion.service';

@Pipe({
  name: 'denominacionEstadoConservacion',
})
export class DenominacionEstadoConservacionPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._estadoConservacion
          .buscarPorId(value)
          .pipe(
            map(estadoConservacion =>
              estadoConservacion
                ? estadoConservacion['denominacion']
                : String(value)
            )
          )
      : of('no aplica');
  }
  constructor(private _estadoConservacion: EstadoConservacionService) {}
}
