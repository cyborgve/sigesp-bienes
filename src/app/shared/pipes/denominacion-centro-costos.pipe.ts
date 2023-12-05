import { Pipe, PipeTransform } from '@angular/core';
import { CentroCostosService } from '@core/services/otros-modulos/centro-costos.service';
import { adaptarCentroCostos } from '@core/utils/pipes-rxjs/adaptadores/adaptar-centro-costo';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'denominacionCentroCostos',
})
export class DenominacionCentroCostosPipe implements PipeTransform {
  transform(value: string): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === '---') return of('---');
    if (value === '--') return of('---');
    return this._centroCostos.buscarPorId(value).pipe(
      adaptarCentroCostos(),
      map(centroCostos => centroCostos.denominacion)
    );
  }

  constructor(private _centroCostos: CentroCostosService) {}
}
