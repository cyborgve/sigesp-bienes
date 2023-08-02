import { Pipe, PipeTransform } from '@angular/core';
import { TipoMarcaService } from '@core/services/definiciones/tipo-marca.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionTipoMarca',
})
export class DenominacionTipoMarcaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._tipoMarca
      .buscarPorId(value)
      .pipe(
        map(tipoMarca =>
          tipoMarca ? tipoMarca['denominacion'] : String(value)
        )
      );
  }

  constructor(private _tipoMarca: TipoMarcaService) {}
}
