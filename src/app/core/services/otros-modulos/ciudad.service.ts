import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciudad } from '@core/models/otros-modulos/ciudad';
import { SigespService } from 'sigesp';
import {
  adaptarCiudad,
  adaptarCiudades,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-ciudad';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/ciudad-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Ciudad[]> {
    return this._http.get<Ciudad[]>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(objeto => normalizarObjeto(objeto))),
      adaptarCiudades()
    );
  }

  buscarPorId(id: Id): Observable<Ciudad> {
    return this._http.get<Ciudad>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(objeto => normalizarObjeto(objeto))),
      map(data => data[0]),
      adaptarCiudad()
    );
  }
}
