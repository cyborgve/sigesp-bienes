import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { EstadoUsoService } from '@core/services/definiciones/estado-uso.service';

@Pipe({
  name: 'denominacionEstadoUso',
})
export class DenominacionEstadoUsoPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._estadoUso
      .buscarPorId(value)
      .pipe(map(estadoUso => estadoUso['denominacion']));
  }

  constructor(private _estadoUso: EstadoUsoService) {}
}
