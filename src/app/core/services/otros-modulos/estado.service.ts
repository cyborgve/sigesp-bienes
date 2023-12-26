import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '@core/models/otros-modulos/estado';
import { Observable } from 'rxjs';
import { SigespService } from 'sigesp';
import {
  adaptarEstado,
  adaptarEstados,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-estado';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/estado-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Estado[]> {
    return this._http.get<Estado[]>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarEstados()
    );
  }

  buscarPorId(id: Id): Observable<Estado> {
    return this._http.get<Estado>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      map(data => data[0]),
      adaptarEstado()
    );
  }
}
