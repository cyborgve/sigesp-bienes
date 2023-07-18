import { switchMap, map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { MarcaService } from '@core/services/marca.service';
import { ModeloService } from '@core/services/modelo.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'denominacionMarcaModelo',
})
export class DenominacionMarcaModeloPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._modelo.buscarPorId(value).pipe(
          switchMap(modelo =>
            this._marca.buscarPorId(modelo.marcaId).pipe(
              map(marca =>
                marca
                  ? `${modelo.denominacion} - ${marca.denominacion}`
                  : String(value)
              ),
              map(denominacion =>
                denominacion === 'Seleccionar - Seleccionar'
                  ? 'Seleccionar'
                  : denominacion
              )
            )
          )
        )
      : of('no aplica');
  }

  constructor(private _modelo: ModeloService, private _marca: MarcaService) {}
}
