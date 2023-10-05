import { switchMap, map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { MarcaService } from '@core/services/definiciones/marca.service';
import { ModeloService } from '@core/services/definiciones/modelo.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionMarcaModelo',
})
export class DenominacionMarcaModeloPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._modelo.buscarPorId(value).pipe(
      switchMap(modelo =>
        this._marca.buscarPorId(modelo.marcaId).pipe(
          map(marca => `${modelo.denominacion} - ${marca.denominacion}`),
          map(denominacion =>
            denominacion === 'Seleccionar - Seleccionar'
              ? 'Seleccionar'
              : denominacion
          )
        )
      )
    );
  }

  constructor(private _modelo: ModeloService, private _marca: MarcaService) {}
}
