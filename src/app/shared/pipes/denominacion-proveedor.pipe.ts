import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';
import { ProveedorService } from '@core/services/otros-modulos/proveedor.service';

@Pipe({
  name: 'denominacionProveedor',
})
export class DenominacionProveedorPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === '--' || value === '---') return of('---');
    return this._proveedor
      .buscarPorId(value)
      .pipe(map(proveedor => proveedor.rif + ' ' + proveedor.denominacion));
  }
  constructor(private _proveedor: ProveedorService) {}
}
