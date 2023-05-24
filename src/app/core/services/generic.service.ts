import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basica } from '@core/models/basica';
import { ModeloServicio } from '@core/models/modelo-servicio';
import { Id } from '@core/types/id';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericService<T extends Basica>
  implements ModeloServicio<T>
{
  protected apiUrl = `${environment.apiUrl}/${this.getEntidadUrl()}`;
  protected apiUrlId = (id: Id) => `${this.apiUrl}/${id}`;

  protected abstract getEntidadUrl(): string;

  constructor(protected _http: HttpClient, protected _sigesp: SigespService) {}

  buscarTodos(): Observable<T[]> {
    return this._http.get<T[]>(this.apiUrl, {
      headers: this._sigesp.getHttpHeaders(),
    });
  }

  buscarPorId(id: Id): Observable<T> {
    return this._http.get<T>(this.apiUrlId(id), {
      headers: this._sigesp.getHttpHeaders(),
    });
  }

  guardar(entidad: T): Observable<T> {
    return this._http.post<T>(this.apiUrl, entidad, {
      headers: this._sigesp.getHttpHeaders(),
    });
  }

  actualizar(id: Id, entidad: T): Observable<T> {
    return this._http.put<T>(this.apiUrlId(id), entidad, {
      headers: this._sigesp.getHttpHeaders(),
    });
  }

  eliminar(id: Id): Observable<T> {
    return this._http.delete<T>(this.apiUrlId(id), {
      headers: this._sigesp.getHttpHeaders(),
    });
  }

  existe(id: Id): Observable<boolean> {
    return this._http
      .get(this.apiUrlId(id), {
        headers: this._sigesp.getHttpHeaders(),
      })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
