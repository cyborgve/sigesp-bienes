import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SigespService } from 'sigesp';
import { Parroquia } from '@core/models/otros-modulos/parroquia';
import {
  adaptarParroquia,
  adaptarParroquias,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-parroquia';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class ParroquiaService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/parroquia-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Parroquia[]> {
    return this._http.get<Parroquia[]>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(objeto => normalizarObjeto(objeto))),
      adaptarParroquias()
    );
  }

  buscarPorId(id: Id): Observable<Parroquia> {
    return this._http.get<Parroquia>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(objeto => normalizarObjeto(objeto))),
      map(data => data[0]),
      adaptarParroquia()
    );
  }
}
