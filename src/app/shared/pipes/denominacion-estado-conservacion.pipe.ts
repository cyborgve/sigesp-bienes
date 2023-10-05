import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { EstadoConservacionService } from '@core/services/definiciones/estado-conservacion.service';

@Pipe({
  name: 'denominacionEstadoConservacion',
})
export class DenominacionEstadoConservacionPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._estadoConservacion
      .buscarPorId(value)
      .pipe(map(estadoConservacion => estadoConservacion['denominacion']));
  }
  constructor(private _estadoConservacion: EstadoConservacionService) {}
}
