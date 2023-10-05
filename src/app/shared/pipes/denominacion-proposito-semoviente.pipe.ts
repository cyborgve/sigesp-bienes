import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { PropositoSemovienteService } from '@core/services/definiciones/proposito-semoviente.service';

@Pipe({
  name: 'denominacionPropositoSemoviente',
})
export class DenominacionPropositoSemovientePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._propositoSemoviente
      .buscarPorId(value)
      .pipe(map(proposito => proposito['denominacion']));
  }

  constructor(private _propositoSemoviente: PropositoSemovienteService) {}
}
