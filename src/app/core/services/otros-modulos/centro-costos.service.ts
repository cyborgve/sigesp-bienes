import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CentroCostos } from '@core/models/otros-modulos/centro-costo';
import { Id } from '@core/types/id';
import { SigespService } from 'sigesp';
import {
  adaptarCentroCostos,
  adaptarCentrosCostos,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-centro-costo';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';

@Injectable({
  providedIn: 'root',
})
export class CentroCostosService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/centro-costos-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<CentroCostos[]> {
    return this._http.get<CentroCostos[]>(this.apiUrl).pipe(
      map((res: any) => res.data),
      adaptarCentrosCostos(),
      filtrarValoresIniciales()
    );
  }

  buscarPorId(id: Id): Observable<CentroCostos> {
    return this._http.get<CentroCostos>(this.apiUrlId(id)).pipe(
      map((res: any) => res.data),
      map(proveedores => proveedores[0]),
      adaptarCentroCostos()
    );
  }
}
