import {
  adaptarResponsable,
  adaptarResponsables,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-responsable';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SigespService } from 'sigesp';
import { Id } from '@core/types/id';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { ordenarPorId } from '@core/utils/pipes-rxjs/operadores/ordenar-por-id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

@Injectable({
  providedIn: 'root',
})
export class ResponsableService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/responsable-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Responsable[]> {
    return this._http.get<Responsable[]>(this.apiUrl).pipe(
      map((respuesta: any) => respuesta.data),
      adaptarResponsables(),
      ordenarPorId()
    );
  }

  buscarPorId(id: Id): Observable<Responsable> {
    return this._http.get<Responsable>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      map(data => data[0]),
      adaptarResponsable()
    );
  }
}
