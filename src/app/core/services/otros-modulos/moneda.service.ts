import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SigespService } from 'sigesp';
import {
  adaptarMoneda,
  adaptarMonedas,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-moneda';
import { Observable } from 'rxjs';
import { Moneda } from '@core/models/otros-modulos/moneda';
import { Id } from '@core/types/id';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  constructor(private _sigesp: SigespService) {}

  buscarTodos(): Observable<Moneda[]> {
    return this._sigesp
      .getMonedas('todas')
      .pipe(adaptarMonedas(), filtrarValoresIniciales(), ordenarPorCodigo());
  }

  buscarPorId(id: Id): Observable<Moneda> {
    return this._sigesp.getMonedas('uno', Number(id)).pipe(
      map(monedas => monedas[0]),
      adaptarMoneda()
    );
  }
}
