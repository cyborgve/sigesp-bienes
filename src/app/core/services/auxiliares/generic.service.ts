import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Basica } from '@core/models/auxiliares/basica';
import { ModeloServicio } from '@core/models/auxiliares/modelo-servicio';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { convertirTipoOracion } from '@core/utils/funciones/convertir-tipo-oracion';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { ordenarPorId } from '@core/utils/pipes-rxjs/operadores/ordenar-por-id';
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
    protected _snackBar: MatSnackBar
  ) {}

  buscarTodos(): Observable<T[]> {
    return this._http.get<T[]>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      map(resultado => resultado.map(normalizarObjeto)),
      map(resultado => resultado as T[]),
      filtrarValoresIniciales(),
      ordenarPorId()
    );
  }

  buscarPorId(id: Id): Observable<T> {
    return this._http.get<T>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data[0]),
      map(normalizarObjeto),
      map(resultado => resultado as T)
    );
  }

  guardar(
    entidad: T,
    tipoDato: string,
    notificar: boolean = true
  ): Observable<T> {
    return this._http.post<T>(this.apiUrl, entidad).pipe(
      map((resultado: any) => resultado.data[0]),
      map(normalizarObjeto),
      map(resultado => resultado),
      tap(resultado => {
        if (notificar) {
          let mensaje = convertirTipoOracion(tipoDato) + ': ';
          if (resultado) {
            if (resultado.codigo) {
              mensaje += String(resultado.codigo).split('-')[1];
              if (resultado.denominacion) {
                mensaje += ` - ${resultado.denominacion}`;
              }
              mensaje += ', guardado correctamente';
            }
            if (resultado.comprobante) {
              mensaje += String(resultado.comprobante).split('-')[1];
              if (resultado.denominacion) {
                mensaje += ` - ${resultado.denominacion}`;
              }
              mensaje = mensaje + ', procesado correctamente';
            }
          }
          this.snackBarMessage(mensaje);
        }
      })
    );
  }

  actualizar(
    id: Id,
    entidad: T,
    tipoDato: string,
    notificar: boolean = true
  ): Observable<number> {
    return this._http.put<Number>(this.apiUrlId(id), entidad).pipe(
      map((resultado: any) => resultado.data),
      tap((resultado: number) => {
        if (notificar) {
          // let mensaje =
          if (resultado > 0) {
            let ent = entidad as any;
            if (ent.codigo)
              this.snackBarMessage(
                `${convertirTipoOracion(tipoDato)}: "${
                  String(ent.codigo).split('-')[1]
                }-${ent.denominacion}", actualizado correctamente`
              );
          }
        }
      })
    );
  }

  eliminar(
    id: Id,
    tipoDato: string,
    notificar: boolean = true
  ): Observable<boolean> {
    return this._http.delete<boolean>(this.apiUrlId(id)).pipe(
      tap(eliminado => {
        if (notificar) {
          if (eliminado)
            this.snackBarMessage(
              `${convertirTipoOracion(
                tipoDato
              )}: ${id}, fue eliminado correctamente`
            );
        }
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
