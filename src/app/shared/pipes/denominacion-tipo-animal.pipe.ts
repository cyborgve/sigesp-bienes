import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoAnimalService } from '@core/services/tipo-animal.service';

@Pipe({
  name: 'denominacionTipoAnimal',
})
export class DenominacionTipoAnimalPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._tipoAnimal
          .buscarPorId(value)
          .pipe(
            map(tipoAnimal =>
              tipoAnimal ? tipoAnimal['denominacion'] : String(value)
            )
          )
      : of('no aplica');
  }

  constructor(private _tipoAnimal: TipoAnimalService) {}
}
