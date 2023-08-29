import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SigespService } from 'sigesp';
import { Id } from '@core/types/id';
import { ProveedorService } from '@core/services/otros-modulos/proveedor.service';

@Pipe({
  name: 'denominacionProveedor',
})
export class DenominacionProveedorPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._proveedor
      .buscarPorId(value)
      .pipe(
        map(proveedor =>
          proveedor
            ? proveedor.rif + ' ' + proveedor.denominacion
            : String(value)
        )
      );
  }
  constructor(private _proveedor: ProveedorService) {}
}
