import { convertirDesincorporacionUbicacion } from '@core/utils/funciones/convertir-desincorporacion-ubicacion';
import { reversarDesincorporacion } from '@core/utils/pipes-rxjs/procesos/reversar-desincorporacion';
import { TipoProceso } from '@core/types/tipo-proceso';
import { switchMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Desincorporacion } from '@core/models/procesos/desincorporacion';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesincorporacionActivoService } from './desincorporacion-activo.service';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';
import { Observable, forkJoin } from 'rxjs';
import { Id } from '@core/types/id';
import { adaptarDesincorporacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-desincorporacion';
import { DesincorporacionCuentaService } from './desincorporacion-cuenta.service';
import { adaptarDesincorporaciones } from '@core/utils/pipes-rxjs/adaptadores/adaptar-desincorporacion';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { PDFService } from '../auxiliares/pdf.service';
import { abrirReporteProceso } from '@core/utils/pipes-rxjs/procesos/abrir-reporte-proceso';
import { ejecutarDesincorporacion } from '@core/utils/pipes-rxjs/procesos/ejecutar-desincorporacion';
import { DesincorporacionUbicacionService } from './desincorporacion-ubicacion.service';
import { DesincorporacionUbicacion } from '@core/models/auxiliares/desincorporacion-ubicacion';

@Injectable({
  providedIn: 'root',
})
export class DesincorporacionService extends GenericService<Desincorporacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'desincorporacion').valor;
  }
  private apiUrlActivo = (activo: Id) => `${this.apiUrl}?activo=${activo}`;

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _desincorporacionActivo: DesincorporacionActivoService,
    private _desincorporacionCuenta: DesincorporacionCuentaService,
    private _desincorporacionUbicacion: DesincorporacionUbicacionService,
    private _activoUbicacion: ActivoUbicacionService,
    private _pdf: PDFService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Desincorporacion[]> {
    return super.buscarTodos().pipe(adaptarDesincorporaciones());
  }

  buscarPorId(id: Id): Observable<Desincorporacion> {
    return super.buscarPorId(id).pipe(
      adaptarDesincorporacion(),
      switchMap(desincorporacion => {
        let buscarComplementos = [
          this._desincorporacionActivo.buscarTodosPorProceso(
            desincorporacion.id
          ),
          this._desincorporacionCuenta.buscarTodosPorProceso(
            desincorporacion.id
          ),
          this._desincorporacionUbicacion.buscarTodosPorProceso(
            desincorporacion.id
          ),
        ];
        return forkJoin(buscarComplementos).pipe(
          map(
            ([activosProceso, cuentasProceso, desincorporacionUbicaciones]) => {
              desincorporacion.activos = activosProceso as ActivoProceso[];
              desincorporacion.cuentasContables =
                cuentasProceso as CuentaContableProceso[];
              desincorporacion.ubicaciones =
                desincorporacionUbicaciones as DesincorporacionUbicacion[];
              return desincorporacion;
            }
          )
        );
      })
    );
  }

  buscarPorActivo(id: Id): Observable<Desincorporacion> {
    return this._http.get(this.apiUrlActivo(id)).pipe(
      adaptarDesincorporacion(),
      switchMap(desincorporacion => {
        let buscarComplementos = [
          this._desincorporacionActivo.buscarTodosPorProceso(
            desincorporacion.id
          ),
          this._desincorporacionCuenta.buscarTodosPorProceso(
            desincorporacion.id
          ),
          this._desincorporacionUbicacion.buscarTodosPorProceso(
            desincorporacion.id
          ),
        ];
        return forkJoin(buscarComplementos).pipe(
          map(
            ([activosProceso, cuentasProceso, desincorporacionUbicaciones]) => {
              desincorporacion.activos = activosProceso as ActivoProceso[];
              desincorporacion.cuentasContables =
                cuentasProceso as CuentaContableProceso[];
              desincorporacion.ubicaciones =
                desincorporacionUbicaciones as DesincorporacionUbicacion[];
              return desincorporacion;
            }
          )
        );
      })
    );
  }

  guardar(
    entidad: Desincorporacion,
    tipoProceso: TipoProceso,
    notificar?: boolean
  ): Observable<Desincorporacion> {
    return super.guardar(entidad, tipoProceso, notificar).pipe(
      adaptarDesincorporacion(),
      switchMap(desincorporacion => {
        let buscarUbicaciones = entidad.activos.map(activoProceso =>
          this._activoUbicacion
            .buscarPorId(activoProceso.activo)
            .pipe(map(convertirDesincorporacionUbicacion))
        );
        return forkJoin(buscarUbicaciones).pipe(
          map(ubicaciones => {
            desincorporacion.ubicaciones = ubicaciones;
            return desincorporacion;
          })
        );
      }),
      switchMap(desincorporacion => {
        let guardarActivos = entidad.activos
          .map(activoProceso => {
            activoProceso.proceso = desincorporacion.id;
            return activoProceso;
          })
          .map(activoProceso =>
            this._desincorporacionActivo.guardar(
              activoProceso,
              undefined,
              false
            )
          );
        let guardarCuentas = entidad.cuentasContables
          .map(cuentaProceso => {
            cuentaProceso.proceso = desincorporacion.id;
            return cuentaProceso;
          })
          .map(cuentaProceso =>
            this._desincorporacionCuenta.guardar(
              cuentaProceso,
              undefined,
              false
            )
          );
        let guardarUbicaciones = desincorporacion.ubicaciones
          .map(ubicacion => {
            ubicacion.proceso = desincorporacion.id;
            return ubicacion;
          })
          .map(ubicacion =>
            this._desincorporacionUbicacion.guardar(ubicacion, undefined, false)
          );
        return forkJoin([
          ...guardarActivos,
          ...guardarCuentas,
          ...guardarUbicaciones,
        ]).pipe(
          map(activosCuentasUbicaciones => {
            desincorporacion.activos = activosCuentasUbicaciones.slice(
              0,
              guardarActivos.length
            ) as ActivoProceso[];
            desincorporacion.cuentasContables = activosCuentasUbicaciones.slice(
              guardarActivos.length,
              guardarActivos.length + guardarCuentas.length
            ) as CuentaContableProceso[];
            desincorporacion.ubicaciones = activosCuentasUbicaciones.slice(
              guardarActivos.length + guardarCuentas.length
            ) as DesincorporacionUbicacion[];
            return desincorporacion;
          })
        );
      }),
      ejecutarDesincorporacion(this._activoUbicacion),
      abrirReporteProceso(this._pdf, 'DESINCORPORACIÓN')
    );
  }

  eliminar(
    id: Id,
    tipoDato: TipoProceso,
    notificar?: boolean
  ): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(desincorporacion =>
        super.eliminar(id, tipoDato, notificar).pipe(
          map(desincorporacionEliminada =>
            desincorporacionEliminada
              ? desincorporacion
              : desincorporacionEliminada
          ),
          reversarDesincorporacion(this._activoUbicacion),
          map(modificacion => !!modificacion)
        )
      )
    );
  }
}
