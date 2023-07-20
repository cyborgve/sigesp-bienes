import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { RazaService } from '@core/services/raza.service';

@Pipe({
  name: 'denominacionRaza',
})
export class DenominacionRazaPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._raza
      .buscarPorId(value)
      .pipe(map(raza => (raza ? raza['denominacion'] : String(value))));
  }

  constructor(private _raza: RazaService) {}
}
