import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { ModeloService } from '@core/services/definiciones/modelo.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionModelo',
})
export class DenominacionModeloPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._modelo
      .buscarPorId(value)
      .pipe(map(modelo => modelo['denominacion']));
  }
  constructor(private _modelo: ModeloService) {}
}
