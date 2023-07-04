import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoSemovienteService } from '@core/services/tipo-semoviente.service';
import { TipoUsoService } from '@core/services/tipo-uso.service';

@Pipe({
  name: 'denominacionTipoUso',
})
export class DenominacionTipoUsoPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._tipoUso
      .buscarPorId(value)
      .pipe(map(tipo => (tipo ? tipo['denominacion'] : String(value))));
  }

  constructor(private _tipoUso: TipoUsoService) {}
}
