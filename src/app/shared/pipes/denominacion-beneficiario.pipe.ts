import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { BeneficiarioService } from '@core/services/otros-modulos/beneficiario.service';
import { Id } from '@core/types/id';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionBeneficiario',
})
export class DenominacionBeneficiarioPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === '' || '---') return of('---');
    return this._beneficiario
      .buscarPorId(value)
      .pipe(
        map(beneficiario => beneficiario.cedula + ' ' + beneficiario.nombre)
      );
  }
  constructor(private _beneficiario: BeneficiarioService) {}
}
