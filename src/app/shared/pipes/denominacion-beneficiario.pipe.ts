import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { BeneficiarioService } from '@core/services/otros-modulos/beneficiario.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionBeneficiario',
})
export class DenominacionBeneficiarioPipe implements PipeTransform {
  transform(value: string): Observable<string> {
    if (value === null || value === undefined) of(String(''));
    if (value === '--' || value === '---') of(String('---'));
    if (value !== '---' && value !== '')
      return this._beneficiario
        .buscarPorId(value)
        .pipe(
          map(beneficiario => beneficiario.cedula + ' ' + beneficiario.nombre)
        );
  }
  constructor(private _beneficiario: BeneficiarioService) {}
}
