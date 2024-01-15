import { switchMap, map, tap } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Retorno } from '@core/models/procesos/retorno';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RetornoActivoService } from './retorno-activo.service';
import { PDFService } from '../auxiliares/pdf.service';
import { adaptarRetorno } from '@core/utils/pipes-rxjs/adaptadores/adaptar-retorno';
import { adaptarRetornos } from '@core/utils/pipes-rxjs/adaptadores/adaptar-retorno';
import { Id } from '@core/types/id';
import { ejecutarRetorno } from '@core/utils/pipes-rxjs/procesos/ejecutar-retorno';
import { abrirReporteProceso } from '@core/utils/pipes-rxjs/procesos/abrir-reporte-proceso';
import { reversarRetorno } from '@core/utils/pipes-rxjs/procesos/reversar-retorno';
import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';
import { generarRetornos } from '@core/utils/pipes-rxjs/procesos/generar-retornos';
import { ActaPrestamoService } from './acta-prestamo.service';
import { AutorizacionSalidaService } from './autorizacion-salida.service';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';
import { prepararActivoProcesoRetorno } from '@core/utils/funciones/preparar-activo-proceso-retorno';
import { RetornoLista } from '@core/models/auxiliares/retorno-lista';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarRetornosLista } from '@core/utils/pipes-rxjs/adaptadores/adaptar-retorno-lista';

@Injectable({
  providedIn: 'root',
})
export class RetornoService extends GenericService<Retorno> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'retorno').valor;
  }
  private apiUrlLista = () => `${this.apiUrl}?lista=${'lista'}`;

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _retornoActivo: RetornoActivoService,
    private _actaPrestamo: ActaPrestamoService,
    private _autorizacionSalida: AutorizacionSalidaService,
    private _activoUbicacion: ActivoUbicacionService,
    private _pdf: PDFService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Retorno[]> {
    return super.buscarTodos().pipe(adaptarRetornos());
  }

  buscarTodosLista(): Observable<RetornoLista[]> {
    return this._http.get(this.apiUrlLista()).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarRetornosLista()
    );
  }

  buscarPorId(id: Id): Observable<Retorno> {
    return super.buscarPorId(id).pipe(
      adaptarRetorno(),
      switchMap(retorno =>
        this._retornoActivo.buscarTodosPorProceso(retorno.id).pipe(
          map(activos => {
            retorno.activos = activos;
            return retorno;
          })
        )
      )
    );
  }

  guardar(
    entidad: Retorno,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Retorno> {
    return super.guardar(entidad, tipoDato, notificar).pipe(
      adaptarRetorno(),
      switchMap(retornoGuardado => {
        let guardarActivos = entidad.activos
          .map(prepararActivoProcesoRetorno)
          .map(activo => {
            activo.proceso = retornoGuardado.id;
            return this._retornoActivo.guardar(activo, undefined, false);
          });
        return forkJoin(guardarActivos).pipe(
          map(activosGuardados => {
            retornoGuardado.activos = activosGuardados;
            return retornoGuardado;
          })
        );
      }),
      ejecutarRetorno(
        this._activoUbicacion,
        this._actaPrestamo,
        this._autorizacionSalida
      ),
      abrirReporteProceso(this._pdf, 'RETORNO')
    );
  }

  guardarTodos(
    observaciones: string,
    activosListaRetorno: ActivoListaRetorno[]
  ): Observable<Retorno[]> {
    return of(activosListaRetorno).pipe(
      generarRetornos(
        observaciones,
        this._actaPrestamo,
        this._autorizacionSalida
      ),
      switchMap(retornos => {
        let guardarRetornos = retornos.map(retorno =>
          this.guardar(retorno, 'RETORNO', true)
        );
        return forkJoin(guardarRetornos);
      })
    );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(retorno =>
        super.eliminar(id, tipoDato, notificar).pipe(
          map(eliminada => (eliminada ? retorno : eliminada)),
          reversarRetorno(this),
          map(retorno => !!retorno)
        )
      )
    );
  }
}
