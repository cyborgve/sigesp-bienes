import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoSemovienteService } from '@core/services/tipo-semoviente.service';

@Pipe({
  name: 'denominacionTipoUso',
})
export class DenominacionTipoUsoPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._tipoSemoviente
      .buscarPorId(value)
      .pipe(map(tipoSemoviente => tipoSemoviente.denominacion));
  }

  constructor(private _tipoSemoviente: TipoSemovienteService) {}
}
