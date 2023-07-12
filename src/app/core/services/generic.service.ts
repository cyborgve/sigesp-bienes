import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basica } from '@core/models/auxiliares/basica';
import { ModeloServicio } from '@core/models/auxiliares/modelo-servicio';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { filtrarValoresIniciales } from '@core/utils/operadores-rxjs/filtrar-valores-iniciales';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericService<T extends Basica>
  implements ModeloServicio<T>
{
  protected apiUrl = `${this._sigesp.URL}/${this.getEntidadUrl()}`;
  protected apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  protected abstract getEntidadUrl(): string;

  constructor(protected _http: HttpClient, protected _sigesp: SigespService) {}

  buscarTodos(): Observable<T[]> {
    return this._http.get<T[]>(this.apiUrl).pipe(
      map((res: any) => res.data.map((ent: T) => normalizarObjeto(ent))),
      filtrarValoresIniciales()
    );
  }

  buscarPorId(id: Id): Observable<T> {
    return this._http.get<T>(this.apiUrlId(id)).pipe(
      map((res: any) => res.data as T[]),
      map(data => normalizarObjeto(data[0]))
    );
  }

  guardar(entidad: T): Observable<T> {
    return this._http
      .post<T>(this.apiUrl, entidad)
      .pipe(map(respuesta => normalizarObjeto(respuesta)));
  }

  actualizar(id: Id, entidad: T): Observable<Number> {
    return this._http.put<Number>(this.apiUrlId(id), entidad);
  }

  eliminar(id: Id): Observable<T> {
    return this._http.delete<T>(this.apiUrlId(id));
  }

  existe(id: Id): Observable<boolean> {
    return this._http.get(this.apiUrlId(id)).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
