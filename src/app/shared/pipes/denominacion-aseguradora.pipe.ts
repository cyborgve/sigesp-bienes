import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { AseguradoraService } from '@core/services/definiciones/aseguradora.service';

@Pipe({
  name: 'denominacionAseguradora',
})
export class DenominacionAseguradoraPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._aseguradora
      .buscarPorId(value)
      .pipe(map(aseguradora => aseguradora['denominacion']));
  }
  constructor(private _aseguradora: AseguradoraService) {}
}
