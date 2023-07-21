import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Basica } from '@core/models/auxiliares/basica';
import { ModeloServicio } from '@core/models/auxiliares/modelo-servicio';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { filtrarValoresIniciales } from '@core/utils/operadores-rxjs/filtrar-valores-iniciales';
import { ordenarPorId } from '@core/utils/operadores-rxjs/ordenar-por-id';
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
      filtrarValoresIniciales(),
      ordenarPorId()
    );
  }

  buscarPorId(id: Id): Observable<T> {
    return this._http.get<T>(this.apiUrlId(id)).pipe(
      map((res: any) => res.data as T[]),
      map(data => normalizarObjeto(data[0]))
    );
  }

  guardar(entidad: T, tipoDato: string): Observable<T> {
    return this._http.post<T>(this.apiUrl, entidad).pipe(
      map(respuesta => normalizarObjeto(respuesta)),
      tap(respuesta => {
        if (respuesta.data.length > 0) {
          let entidad = respuesta.data[0];
          this.snackBarMessage(
            `Registro de ${tipoDato}: ${String(
              entidad.denominacion
            )}, guardado correactamente bajo el CODIGO: ${
              String(entidad.codigo).split('-')[1]
            }`
          );
        }
      })
    );
  }

  actualizar(id: Id, entidad: T, tipoDato: string): Observable<Number> {
    return this._http.put<Number>(this.apiUrlId(id), entidad).pipe(
      tap((respuesta: any) => {
        if (respuesta.data > 0) {
          let ent = entidad as any;
          this.snackBarMessage(
            `Registro de ${tipoDato}: ${ent.denominacion} CODIGO: ${String(
              ent.codigo
            ).substring(5)}, actualizado correctamente`
          );
        }
      })
    );
  }

  eliminar(id: Id, tipoDato: string): Observable<T> {
    return this._http.delete<T>(this.apiUrlId(id)).pipe(
      tap(eliminado => {
        if (eliminado)
          this.snackBarMessage(
            `Registro de ${tipoDato} eliminado correctamente`
          );
      })
    );
  }

  existe(id: Id): Observable<boolean> {
    return this._http.get(this.apiUrlId(id)).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
