import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';
import { UnidadOrganizativaService } from '@core/services/otros-modulos/unidad-organizativa.service';

@Pipe({
  name: 'denominacionUnidadOrganizativa',
})
export class DenominacionUnidadOrganizativaPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._unidadOrganizativa
      .buscarPorId(value)
      .pipe(map(unidad => unidad.denominacion));
  }
  constructor(private _unidadOrganizativa: UnidadOrganizativaService) {}
}
