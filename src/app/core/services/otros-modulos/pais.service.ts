import { map } from 'rxjs/operators';
import { Pais } from '@core/models/otros-modulos/pais';
import { Injectable } from '@angular/core';
import { SigespService } from 'sigesp';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  adaptarPais,
  adaptarPaises,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-pais';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/pais-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Pais[]> {
    return this._http.get<Pais[]>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(objeto => normalizarObjeto(objeto))),
      adaptarPaises()
    );
  }

  buscarPorId(id: Id): Observable<Pais> {
    return this._http.get<Pais>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(objeto => normalizarObjeto(objeto))),
      map(data => data[0]),
      adaptarPais()
    );
  }
}
