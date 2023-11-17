import { Pipe, PipeTransform } from '@angular/core';
import { adaptarCentrosCostos } from '@core/utils/pipes-rxjs/adaptadores/adaptar-centro-costo';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Pipe({
  name: 'denominacionCentroCostos',
})
export class DenominacionCentroCostosPipe implements PipeTransform {
  transform(value: string): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === '--') return of('--');
    return this._sigesp.getCentroCosto('all').pipe(
      adaptarCentrosCostos(),
      map(centros => centros.find(centro => centro.id === value)),
      map(centro => centro['denominacion'])
    );
  }

  constructor(private _sigesp: SigespService) {}
}
