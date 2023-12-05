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
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/moneda-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _http: HttpClient, private _sigesp: SigespService) {}

  buscarTodos(): Observable<Moneda[]> {
    return this._http.get<any>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      adaptarMonedas(),
      filtrarValoresIniciales(),
      ordenarPorCodigo()
    );
  }

  buscarPorId(id: Id): Observable<Moneda> {
    return this._http.get<any>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data[0]),
      adaptarMoneda()
    );
  }
}
