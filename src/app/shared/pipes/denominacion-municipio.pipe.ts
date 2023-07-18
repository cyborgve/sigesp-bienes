import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';
import { MunicipioService } from '@core/services/otros-modulos/municipio.service';

@Pipe({
  name: 'denominacionMunicipio',
})
export class DenominacionMunicipioPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return value
      ? this._municipio.buscarTodos().pipe(
          map(municipios =>
            municipios.find(municipio => municipio['id'] === String(value))
          ),
          map(municipio =>
            municipio ? municipio['denominacion'] : String(value)
          )
        )
      : of('no aplica');
  }
  constructor(private _municipio: MunicipioService) {}
}
