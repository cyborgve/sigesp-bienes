import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SigespService } from 'sigesp';

@Pipe({
  name: 'denominacionParroquia',
})
export class DenominacionParroquiaPipe implements PipeTransform {
  transform(value: string): Observable<string> {
    return this._sigesp.getParishes().pipe(
      map(parroquias => parroquias.find(p => p.code === String(value))),
      map(parroquia => (parroquia ? parroquia['name'] : String(value)))
    );
  }
  constructor(private _sigesp: SigespService) {}
}
