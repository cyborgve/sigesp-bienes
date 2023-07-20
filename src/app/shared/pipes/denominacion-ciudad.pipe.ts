import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';
import { CiudadService } from '@core/services/otros-modulos/ciudad.service';

@Pipe({
  name: 'denominacionCiudad',
})
export class DenominacionCiudadPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._ciudad.buscarTodos().pipe(
      map(ciudades => ciudades.find(ciudad => ciudad.id === value)),
      map(ciudad => (ciudad ? ciudad['denominacion'] : String(value)))
    );
  }

  constructor(private _ciudad: CiudadService) {}
}
