import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { AseguradoraService } from '@core/services/definiciones/aseguradora.service';

@Pipe({
  name: 'denominacionAseguradora',
})
export class DenominacionAseguradoraPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._aseguradora
      .buscarPorId(value)
      .pipe(
        map(aseguradora =>
          aseguradora ? aseguradora['denominacion'] : String(value)
        )
      );
  }
  constructor(private _aseguradora: AseguradoraService) {}
}
