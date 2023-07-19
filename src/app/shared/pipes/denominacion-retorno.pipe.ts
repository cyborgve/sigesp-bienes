import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { RetornoService } from '@core/services/procesos/retorno.service';

@Pipe({
  name: 'denominacionRetorno',
})
export class DenominacionRetornoPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return of(String(value));
  }
  constructor(private _retorno: RetornoService) {}
}
