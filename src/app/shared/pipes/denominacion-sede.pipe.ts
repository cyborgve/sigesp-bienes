import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { SedeService } from '@core/services/sede.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'denominacionSede',
})
export class DenominacionSedePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._sede.buscarPorId(value).pipe(map(sede => sede.denominacion));
  }

  constructor(private _sede: SedeService) {}
}
