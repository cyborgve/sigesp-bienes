import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { MarcaService } from '@core/services/definiciones/marca.service';

@Pipe({
  name: 'denominacionMarca',
})
export class DenominacionMarcaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._marca
      .buscarPorId(value)
      .pipe(map(marca => marca['denominacion']));
  }
  constructor(private _marca: MarcaService) {}
}
