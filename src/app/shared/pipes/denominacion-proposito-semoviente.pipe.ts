import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { PropositoSemovienteService } from '@core/services/proposito-semoviente.service';

@Pipe({
  name: 'denominacionPropositoSemoviente',
})
export class DenominacionPropositoSemovientePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._propositoSemoviente
          .buscarPorId(value)
          .pipe(
            map(proposito =>
              proposito ? proposito['denominacion'] : String(value)
            )
          )
      : of('no aplica');
  }

  constructor(private _propositoSemoviente: PropositoSemovienteService) {}
}
