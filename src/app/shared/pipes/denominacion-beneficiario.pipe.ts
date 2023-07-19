import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionBeneficiario',
})
export class DenominacionBeneficiarioPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return of(String(value));
  }
  constructor() {}
}
