import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { ModeloService } from '@core/services/definiciones/modelo.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'denominacionModelo',
})
export class DenominacionModeloPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._modelo
      .buscarPorId(value)
      .pipe(map(modelo => (modelo ? modelo['denominacion'] : String(value))));
  }
  constructor(private _modelo: ModeloService) {}
}
