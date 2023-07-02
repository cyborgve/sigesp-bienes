import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Pipe({
  name: 'denominacionCuentaContable',
})
export class DenominacionCuentaContablePipe implements PipeTransform {
  transform(value: string): Observable<string> {
    return this._sigesp.getCuentasInstitucionales().pipe(
      map(cuentas => cuentas.filter(cta => cta.cuenta === value)),
      map(cuentas => cuentas[0].denominacion)
    );
  }

  constructor(private _sigesp: SigespService) {}
}
