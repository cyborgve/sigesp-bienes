import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoSemovienteService } from '@core/services/definiciones/tipo-semoviente.service';

@Pipe({
  name: 'denominacionTipoSemoviente',
})
export class DenominacionTipoSemovientePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._tipoSemoviente
      .buscarPorId(value)
      .pipe(map(tipo => tipo['denominacion']));
  }

  constructor(private _tipoSemoviente: TipoSemovienteService) {}
}
