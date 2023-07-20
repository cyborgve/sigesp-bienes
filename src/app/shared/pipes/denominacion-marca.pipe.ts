import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { MarcaService } from '@core/services/marca.service';

@Pipe({
  name: 'denominacionMarca',
})
export class DenominacionMarcaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._marca
      .buscarPorId(value)
      .pipe(map(marca => (marca ? marca['denominacion'] : String(value))));
  }
  constructor(private _marca: MarcaService) {}
}
