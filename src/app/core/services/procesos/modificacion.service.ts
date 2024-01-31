import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Modificacion } from '@core/models/procesos/modificacion';
import { END_POINTS } from '@core/constants/end-points';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModificacionComponenteService } from './modificacion-componente.service';
import { ModificacionCuentaContableService } from './modificacion-cuenta-contable.service';
import { PDFService } from '../auxiliares/pdf.service';
import { Observable, forkJoin } from 'rxjs';
import { adaptarModificacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-modificacion';
import { adaptarModificaciones } from '@core/utils/pipes-rxjs/adaptadores/adaptar-modificacion';
import { Id } from '@core/types/id';
import { map, switchMap } from 'rxjs/operators';
import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { abrirReporteProceso } from '@core/utils/pipes-rxjs/procesos/abrir-reporte-proceso';
import { ejecutarModificacion } from '@core/utils/pipes-rxjs/procesos/ejecutar-modificacion';
import { ActivoComponenteService } from '../definiciones/activo-componente.service';
import { reversarModificacion } from '@core/utils/pipes-rxjs/procesos/reversar-modificacion';
import { DepreciacionService } from './depreciacion.service';
import { ActivoService } from '../definiciones/activo.service';
import { __asyncDelegator } from 'tslib';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

@Injectable({
  providedIn: 'root',
})
export class ModificacionService extends GenericService<Modificacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'modificacion').valor;
  }
  private apiUrlActivo = (activo: Id) => `${this.apiUrl}?activo=${activo}`;

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _modificacionComponentes: ModificacionComponenteService,
    private _modificacionCuentaContable: ModificacionCuentaContableService,
    private _pdf: PDFService,
    private _activoComponente: ActivoComponenteService,
    private _depreciacion: DepreciacionService,
    private _activo: ActivoService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<Modificacion[]> {
    return super.buscarTodos().pipe(adaptarModificaciones());
  }

  buscarPorId(id: Id): Observable<Modificacion> {
    return super.buscarPorId(id).pipe(
      adaptarModificacion(),
      switchMap(modificacionGuardada => {
        let buscarComplementos = [
          this._modificacionComponentes.buscarTodosPorProceso(
            modificacionGuardada.id
          ),
          this._modificacionCuentaContable.buscarTodosPorProceso(
            modificacionGuardada.id
          ),
        ];
        return forkJoin(buscarComplementos).pipe(
          map(([componentes, cuentas]) => {
            modificacionGuardada.modificaciones =
              componentes as ComponenteProceso[];
            modificacionGuardada.cuentasContables =
              cuentas as CuentaContableProceso[];
            return modificacionGuardada;
          })
        );
      })
    );
  }

  buscarPorActivo(id: Id): Observable<Modificacion> {
    return this._http.get(this.apiUrlActivo(id)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data[0]),
      map(normalizarObjeto),
      adaptarModificacion(),
      switchMap(modificacionGuardada => {
        let buscarComplementos = [
          this._modificacionComponentes.buscarTodosPorProceso(
            modificacionGuardada.id
          ),
          this._modificacionCuentaContable.buscarTodosPorProceso(
            modificacionGuardada.id
          ),
        ];
        return forkJoin(buscarComplementos).pipe(
          map(([componentes, cuentas]) => {
            modificacionGuardada.modificaciones =
              componentes as ComponenteProceso[];
            modificacionGuardada.cuentasContables =
              cuentas as CuentaContableProceso[];
            return modificacionGuardada;
          })
        );
      })
    );
  }

  guardar(
    entidad: Modificacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Modificacion> {
    return super.guardar(entidad, tipoDato, notificar).pipe(
      adaptarModificacion(),
      switchMap(modificacionGuardada => {
        let guardarComponentes = entidad.modificaciones.map(componente => {
          componente.proceso = modificacionGuardada.id;
          return this._modificacionComponentes.guardar(
            componente,
            undefined,
            false
          );
        });
        let guardarCuentas = entidad.cuentasContables.map(cuenta => {
          cuenta.proceso = modificacionGuardada.id;
          return this._modificacionCuentaContable.guardar(
            cuenta,
            undefined,
            false
          );
        });
        return forkJoin([...guardarComponentes, ...guardarCuentas]).pipe(
          map(complementosGuardados => {
            modificacionGuardada.modificaciones = complementosGuardados.slice(
              0,
              guardarComponentes.length
            ) as ComponenteProceso[];
            modificacionGuardada.cuentasContables = complementosGuardados.slice(
              guardarComponentes.length
            ) as CuentaContableProceso[];
            return modificacionGuardada;
          })
        );
      }),
      ejecutarModificacion(this._activoComponente, this._depreciacion),
      abrirReporteProceso(this._pdf, 'MODIFICACIÓN')
    );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(modificacion =>
        super.eliminar(id, tipoDato, notificar).pipe(
          map(eliminada => (eliminada ? modificacion : eliminada)),
          reversarModificacion(
            this._activoComponente,
            this._depreciacion,
            this._activo
          ),
          map(modificacion => !!modificacion)
        )
      )
    );
  }
}
