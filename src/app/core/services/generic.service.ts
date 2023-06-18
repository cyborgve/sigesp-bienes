import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Basica } from '@core/models/basica';
import { ModeloServicio } from '@core/models/modelo-servicio';
import { Id } from '@core/types/id';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar
  ) {}

  private convertirCamelCase = (cadena: string) => {
    const palabras = cadena.split('_');
    const resultado = palabras.map((palabra, indice) =>
      indice === 0
        ? palabra.toLowerCase()
        : `${palabra.charAt(0).toUpperCase()}${palabra.slice(1).toLowerCase()}`
    );
    return resultado.join('');
  };

  private normalizarRespuesta = (objeto: any) => {
    let entidadTransformada: T = {} as T;
    let claves = Object.keys(objeto);
    for (let clave of claves) {
      let claveTransformada = this.convertirCamelCase(clave);
      entidadTransformada[claveTransformada] = objeto[clave];
    }
    return entidadTransformada;
  };

  buscarTodos(): Observable<T[]> {
    return this._http
      .get<T[]>(this.apiUrl, {
        headers: this._sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) =>
          res.data.map((ent: T) => this.normalizarRespuesta(ent))
        )
      );
  }

  buscarPorId(id: Id): Observable<T> {
    return this._http
      .get<T>(this.apiUrlId(id), {
        headers: this._sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => res.data as T[]),
        map(data => this.normalizarRespuesta(data[0]))
      );
  }

  guardar(entidad: T): Observable<T> {
    return this._http
      .post<T>(this.apiUrl, entidad, {
        headers: this._sigesp.getHttpHeaders(),
      })
      .pipe(
        map(respuesta => this.normalizarRespuesta(respuesta)),
        tap(respuesta => console.trace(respuesta))
      );
  }

  actualizar(id: Id, entidad: T): Observable<Number> {
    return this._http.put<Number>(this.apiUrlId(id), entidad, {
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
