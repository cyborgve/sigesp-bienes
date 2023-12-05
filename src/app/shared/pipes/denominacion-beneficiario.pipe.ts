import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { BeneficiarioService } from '@core/services/otros-modulos/beneficiario.service';
import { Observable, of } from 'rxjs';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionBeneficiario',
})
export class DenominacionBeneficiarioPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of(String(''));
    if (value === '--' || value === '---') return of(String('---'));
    if (value === 'Todos') return of('Todos');
    if (value !== '---' && value !== '')
      return this._beneficiario
        .buscarPorId(value)
        .pipe(
          map(beneficiario => beneficiario.cedula + ' ' + beneficiario.nombre)
        );
  }
  constructor(private _beneficiario: BeneficiarioService) {}
}
