import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Pipe({
  name: 'denominacionCuentaContable',
})
export class DenominacionCuentaContablePipe implements PipeTransform {
  transform(value: string): Observable<string> {
    return this._sigesp.getCuentasInstitucionales().pipe(
      map(cuentas => cuentas.find(cta => cta.cuenta === value)),
      map(cuenta => (cuenta ? cuenta['denominacion'] : String(value)))
    );
  }
  constructor(private _sigesp: SigespService) {}
}
