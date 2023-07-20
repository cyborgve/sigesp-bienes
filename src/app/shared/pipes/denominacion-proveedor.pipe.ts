import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SigespService } from 'sigesp';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionProveedor',
})
export class DenominacionProveedorPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._sigesp.getProveedores().pipe(
      map(proveedores =>
        proveedores.find(proveedor => proveedor.codigo === String(value))
      ),
      map(proveedor => (proveedor ? proveedor.nombre : String(value)))
    );
  }

  constructor(private _sigesp: SigespService) {}
}
