import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoSemovienteService } from '@core/services/tipo-semoviente.service';

@Pipe({
  name: 'denominacionTipoSemoviente',
})
export class DenominacionTipoSemovientePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._tipoSemoviente
          .buscarPorId(value)
          .pipe(map(tipo => (tipo ? tipo['denominacion'] : String(value))))
      : of('no aplica');
  }

  constructor(private _tipoSemoviente: TipoSemovienteService) {}
}
