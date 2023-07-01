import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { PropositoSemovienteService } from '@core/services/proposito-semoviente.service';

@Pipe({
  name: 'denominacionPropositoSemoviente',
})
export class DenominacionPropositoSemovientePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._propositoSemoviente
      .buscarPorId(value)
      .pipe(map(propositoSemoviente => propositoSemoviente.denominacion));
  }

  constructor(private _propositoSemoviente: PropositoSemovienteService) {}
}
