import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { Integracion } from '@core/models/procesos/integracion';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import {
  adaptarIntegracion,
  adaptarIntegraciones,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-integracion';

@Injectable({
  providedIn: 'root',
})
export class IntegracionService extends GenericService<Integracion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'integracion').valor;
  }

  private apiUrlIdIntegracion = (
    id: Id,
    comprobante: string,
    tipoProceso: string
  ) =>
    `${this.apiUrlId(
      id
    )}?comprobante=${comprobante}?tipoProceso=${tipoProceso}`;

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Integracion[]> {
    return super.buscarTodos().pipe(adaptarIntegraciones());
  }

  buscarPorId(
    id: Id,
    comprobante?: string,
    tipoProceso?: string
  ): Observable<Integracion> {
    return this._http
      .get<any>(this.apiUrlIdIntegracion(id, comprobante, tipoProceso))
      .pipe(
        map((resultado: any) => resultado.data),
        map((data: any[]) => data[0]),
        map(objeto => normalizarObjeto(objeto)),
        adaptarIntegracion()
      );
  }

  guardar(
    entidad: Integracion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Integracion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarIntegracion());
  }

  guardarTodos(
    integraciones: Integracion[],
    notificar?: boolean
  ): Observable<Integracion[]> {
    let guardarIntegraciones = integraciones
      .filter(integracion => integracion.registrado == 0)
      .map(integracion => {
        integracion.aprobado = 0;
        integracion.integrado = 0;
        return integracion;
      })
      .map(integracion => this.guardar(integracion, undefined, false));
    return forkJoin(guardarIntegraciones).pipe(
      tap(integracionesGuardadas => {
        if (notificar) {
          let mensaje = `Se han registrado: ${integracionesGuardadas.length} Operaciones nuevas`;
          this._snackBar.open(mensaje, undefined, {
            duration: 6000,
          });
        }
      })
    );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return null;
  }
}
