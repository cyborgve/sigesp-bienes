import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoAnimalService } from '@core/services/definiciones/tipo-animal.service';

@Pipe({
  name: 'denominacionTipoAnimal',
})
export class DenominacionTipoAnimalPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._tipoAnimal
      .buscarPorId(value)
      .pipe(map(tipoAnimal => tipoAnimal['denominacion']));
  }

  constructor(private _tipoAnimal: TipoAnimalService) {}
}
