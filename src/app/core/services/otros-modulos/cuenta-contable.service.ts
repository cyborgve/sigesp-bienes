import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
import { Id } from '@core/types/id';
import { SigespService } from 'sigesp';
import {
  adaptarCuentaContable,
  adaptarCuentasContables,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-cuentas-contables';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';

@Injectable({
  providedIn: 'root',
})
export class CuentaContableService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/cuenta-contable-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<CuentaContable[]> {
    return this._http.get<CuentaContable[]>(this.apiUrl).pipe(
      map((res: any) => res.data),
      adaptarCuentasContables(),
      filtrarValoresIniciales()
    );
  }

  buscarPorId(id: Id): Observable<CuentaContable> {
    return this._http.get<CuentaContable>(this.apiUrlId(id)).pipe(
      map((res: any) => res.data),
      map(proveedores => proveedores[0]),
      adaptarCuentaContable()
    );
  }
}
