import { Pipe, PipeTransform } from '@angular/core';
import { TipoMarcaService } from '@core/services/tipo-marca.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionTipoMarca',
})
export class DenominacionTipoMarcaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._tipoMarca
          .buscarPorId(value)
          .pipe(
            map(tipoMarca =>
              tipoMarca ? tipoMarca['denominacion'] : String(value)
            )
          )
      : of('no aplica');
  }

  constructor(private _tipoMarca: TipoMarcaService) {}
}
