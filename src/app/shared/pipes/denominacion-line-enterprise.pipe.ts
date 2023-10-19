import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { LineEnterpriseService } from '@core/services/otros-modulos/line-enterprise.service';

@Pipe({
  name: 'denominacionLineEnterprise',
})
export class DenominacionLineEnterprisePipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._lineEnterprice
      .buscarPorId(value)
      .pipe(map(lineEnterprise => lineEnterprise.denominacion));
  }
  constructor(private _lineEnterprice: LineEnterpriseService) {}
}
