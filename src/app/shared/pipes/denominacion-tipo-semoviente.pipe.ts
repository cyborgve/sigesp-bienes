import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoSemovienteService } from '@core/services/definiciones/tipo-semoviente.service';

@Pipe({
  name: 'denominacionTipoSemoviente',
})
export class DenominacionTipoSemovientePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._tipoSemoviente
      .buscarPorId(value)
      .pipe(map(tipo => (tipo ? tipo['denominacion'] : String(value))));
  }

  constructor(private _tipoSemoviente: TipoSemovienteService) {}
}
