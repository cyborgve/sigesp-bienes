import { Pipe, PipeTransform } from '@angular/core';
import { CuentaContableService } from '@core/services/otros-modulos/cuenta-contable.service';
import { Id } from '@core/types/id';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionCuentaContable',
})
export class DenominacionCuentaContablePipe implements PipeTransform {
  transform(id: Id): Observable<string> {
    if (id === null || id === undefined) return of('');
    if (id === '--') return of('--');
    if (id === '---') return of('---');
    if (id === 'Todos') return of('Todos');
    return this._cuentaContable
      .buscarPorId(id)
      .pipe(map(cuenta => `${cuenta.id}-${cuenta.denominacion}`));
  }
  constructor(private _cuentaContable: CuentaContableService) {}
}
