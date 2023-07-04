import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';
import { SigespService } from 'sigesp';

@Pipe({
  name: 'denominacionMunicipio',
})
export class DenominacionMunicipioPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._sigesp.getMunicipalities().pipe(
      map(municipios =>
        municipios.find(municipio => municipio['code'] === String(value))
      ),
      map(municipio => (municipio ? municipio['name'] : String(value)))
    );
  }
  constructor(private _sigesp: SigespService) {}
}
