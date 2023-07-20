import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Basica } from '@core/models/auxiliares/basica';
import { ModeloServicio } from '@core/models/auxiliares/modelo-servicio';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { filtrarValoresIniciales } from '@core/utils/operadores-rxjs/filtrar-valores-iniciales';
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
  protected snackBarMessage = (message: string) =>
    this._snackBar.open(message, undefined, { duration: 6000 });

  protected abstract getEntidadUrl(): string;

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    private _snackBar: MatSnackBar
  ) {}

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

  guardar(entidad: T, tipoDato?: string): Observable<T> {
    return this._http.post<T>(this.apiUrl, entidad).pipe(
      map(respuesta => normalizarObjeto(respuesta)),
      tap(respuesta => {
        if (respuesta) {
          let entidad = respuesta.data[0];
          this.snackBarMessage(
            `${tipoDato}: ${String(
              entidad.denominacion
            )}, Guardado correactamente bajo el Código: ${
              String(entidad.codigo).split('-')[1]
            }`
          );
        }
      })
    );
  }

  actualizar(id: Id, entidad: T): Observable<Number> {
    return this._http
      .put<Number>(this.apiUrlId(id), entidad)
      .pipe(tap((respuesta: any) => console.log(respuesta.data)));
  }

  eliminar(id: Id): Observable<T> {
    return this._http
      .delete<T>(this.apiUrlId(id))
      .pipe(tap((respuesta: any) => console.log(respuesta.data)));
  }

  existe(id: Id): Observable<boolean> {
    return this._http.get(this.apiUrlId(id)).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
