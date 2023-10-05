import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { RazaService } from '@core/services/definiciones/raza.service';

@Pipe({
  name: 'denominacionRaza',
})
export class DenominacionRazaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._raza
      .buscarPorId(value)
      .pipe(map(raza => raza['denominacion']));
  }

  constructor(private _raza: RazaService) {}
}
