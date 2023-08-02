import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoAnimalService } from '@core/services/definiciones/tipo-animal.service';

@Pipe({
  name: 'denominacionTipoAnimal',
})
export class DenominacionTipoAnimalPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._tipoAnimal
      .buscarPorId(value)
      .pipe(
        map(tipoAnimal =>
          tipoAnimal ? tipoAnimal['denominacion'] : String(value)
        )
      );
  }

  constructor(private _tipoAnimal: TipoAnimalService) {}
}
