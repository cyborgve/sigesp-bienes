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

@Injectable({
  providedIn: 'root',
})
export class CuentaContableService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/cuenta-contable-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<CuentaContable[]> {
    return this._http.get<CuentaContable[]>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      adaptarCuentasContables(),
      map(cuentas => cuentas.filter(cuenta => cuenta.estatus === 'C'))
    );
  }

  buscarPorId(id: Id): Observable<CuentaContable> {
    return this._http.get<CuentaContable>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map(data => data[0]),
      adaptarCuentaContable()
    );
  }
}
