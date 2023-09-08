import { Pipe, PipeTransform } from '@angular/core';
import { adaptarCentrosCosto } from '@core/utils/adaptadores-rxjs/adaptar-centros-costo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Pipe({
  name: 'denominacionCentroCostos',
})
export class DenominacionCentroCostosPipe implements PipeTransform {
  transform(value: string): Observable<string> {
    return this._sigesp.getCentroCosto('all').pipe(
      adaptarCentrosCosto(),
      map(centros => centros.find(centro => centro.id === value)),
      map(centro => (centro ? centro['denominacion'] : String(value)))
    );
  }

  constructor(private _sigesp: SigespService) {}
}
