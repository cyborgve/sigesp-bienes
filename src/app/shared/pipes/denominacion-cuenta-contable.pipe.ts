import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Pipe({
  name: 'denominacionCuentaContable',
})
export class DenominacionCuentaContablePipe implements PipeTransform {
  transform(value: string): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === '--') return of('--');
    if (value === '---') return of('---');
    return this._sigesp.getCuentasInstitucionales().pipe(
      map(cuentas => cuentas.find(cta => cta.cuenta === value)),
      map(cuenta => cuenta['denominacion'])
    );
  }
  constructor(private _sigesp: SigespService) {}
}
