import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { EstadoUsoService } from '@core/services/definiciones/estado-uso.service';

@Pipe({
  name: 'denominacionEstadoUso',
})
export class DenominacionEstadoUsoPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._estadoUso
      .buscarPorId(value)
      .pipe(
        map(estadoUso =>
          estadoUso ? estadoUso['denominacion'] : String(value)
        )
      );
  }

  constructor(private _estadoUso: EstadoUsoService) {}
}
