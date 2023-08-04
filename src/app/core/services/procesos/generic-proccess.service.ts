import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericProccessService<T extends Basica> {
  protected apiUrl = `${this._sigesp.URL}/${this.getEntidadUrl()}`;
  protected apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;
  protected snackBarMessage = (message: string) =>
    this._snackBar.open(message, undefined, { duration: 6000 });

  protected abstract getEntidadUrl(): string;

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar
  ) {}

  buscarTodos(): Observable<T[]> {
    return this._http.get<T[]>(this.apiUrl);
  }

  buscarPorId(id: Id): Observable<T> {
    return this._http.get<T>(this.apiUrlId(id));
  }

  guardar(
    entidad: T,
    tipoDato: string,
    notificar: boolean = true
  ): Observable<T> {
    return this._http.post<T>(this.apiUrl, entidad);
  }

  actualizar(
    id: Id,
    entidad: T,
    tipoDato: string,
    notificar: boolean = true
  ): Observable<T> {
    return this._http.put<T>(this.apiUrlId(id), entidad);
  }

  eliminar(
    id: Id,
    tipoDato: string,
    notificar: boolean = true
  ): Observable<boolean> {
    return this._http.delete<boolean>(this.apiUrlId(id));
  }

  existe(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this._http.get<boolean>(this.apiUrlId(id)).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
