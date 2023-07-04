import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';
import { SigespService } from 'sigesp';

@Pipe({
  name: 'denominacionEstado',
})
export class DenominacionEstadoPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._sigesp.getStates(String(value)).pipe(
      map(estados => estados[0]),
      map(estado => (estado ? estado['name'] : String(value)))
    );
  }
  constructor(private _sigesp: SigespService) {}
}
