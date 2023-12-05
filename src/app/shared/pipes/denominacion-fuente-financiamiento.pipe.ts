import { SigespService } from 'sigesp';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Id } from '@core/types/id';
import { FuenteFinanciamientoService } from '@core/services/otros-modulos/fuente-financiamiento.service';

@Pipe({
  name: 'denominacionFuenteFinanciamiento',
})
export class DenominacionFuenteFinanciamientoPipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    if (value === null || value === undefined) return of('');
    if (value === '--') return of('--');
    if (value === 'Todos') return of('Todos');
    return this._fuenteFinanciamiento
      .buscarPorId(value)
      .pipe(map(fuente => fuente.denominacion));
  }
  constructor(private _fuenteFinanciamiento: FuenteFinanciamientoService) {}
}
