import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SigespService } from 'sigesp';
import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionCiudad',
})
export class DenominacionCiudadPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._sigesp.getCity().pipe(
      map(ciudades => ciudades.find(ciudad => ciudad.code === value)),
      map(ciudad => (ciudad ? ciudad['name'] : String(value)))
    );
  }

  constructor(private _sigesp: SigespService) {}
}
