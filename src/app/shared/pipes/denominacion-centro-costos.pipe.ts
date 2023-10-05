import { Pipe, PipeTransform } from '@angular/core';
import { adaptarCentrosCosto } from '@core/utils/pipes-rxjs/adaptadores/adaptar-centros-costo';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Pipe({
  name: 'denominacionCentroCostos',
})
export class DenominacionCentroCostosPipe implements PipeTransform {
  transform(value: string): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._sigesp.getCentroCosto('all').pipe(
      adaptarCentrosCosto(),
      map(centros => centros.find(centro => centro.id === value)),
      map(centro => centro['denominacion'])
    );
  }

  constructor(private _sigesp: SigespService) {}
}
