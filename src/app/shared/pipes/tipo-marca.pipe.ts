import { map } from 'rxjs/operators';
import { TipoMarcaService } from '@core/services/tipo-marca.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'tipoMarca',
})
export class TipoMarcaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._tipoMarca
      .buscarPorId(value)
      .pipe(map(tm => tm['denominacion']));
  }

  constructor(private _tipoMarca: TipoMarcaService) {}
}
