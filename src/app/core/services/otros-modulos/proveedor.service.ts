import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SigespService } from 'sigesp';
import {
  adaptarProveedor,
  adaptarProveedores,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-proveedor';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/proveedor-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Proveedor[]> {
    return this._http.get<Proveedor[]>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      adaptarProveedores(),
      filtrarValoresIniciales()
    );
  }

  buscarPorId(id: Id): Observable<Proveedor> {
    return this._http.get<Proveedor>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map((proveedores: any[]) => proveedores[0]),
      adaptarProveedor()
    );
  }
}
