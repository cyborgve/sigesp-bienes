import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Municipio } from '@core/models/otros-modulos/municipio';
import { Observable } from 'rxjs';
import { SigespService } from 'sigesp';
import {
  adaptarMunicipio,
  adaptarMunicipios,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-municipio';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/municipio-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Municipio[]> {
    return this._http.get<Municipio[]>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarMunicipios()
    );
  }

  buscarPorId(id: Id): Observable<Municipio> {
    return this._http.get<Municipio>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      map(data => data[0]),
      adaptarMunicipio()
    );
  }
}
