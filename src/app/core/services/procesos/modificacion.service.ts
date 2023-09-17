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
import { adaptarModificacion } from '@core/utils/adaptadores-rxjs/adaptar-modificacion';
import { adaptarModificaciones } from '@core/utils/adaptadores-rxjs/adaptar-modificaciones';
import { Id } from '@core/types/id';
import { map, switchMap, tap } from 'rxjs/operators';
import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';

@Injectable({
  providedIn: 'root',
})
export class ModificacionService extends GenericService<Modificacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'modificacion').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _modificacionComponentes: ModificacionComponenteService,
    private _modificacionCuentaContable: ModificacionCuentaContableService,
    private _pdf: PDFService
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

  guardar(
    entidad: Modificacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<Modificacion> {
    return super.guardar(entidad, tipoDato, notificar).pipe(
      switchMap(modificacionGuardada => {
        let guardarComponentes = entidad.modificaciones.map(componente =>
          this._modificacionComponentes.guardar(componente, undefined, false)
        );
        let guardarCuentas = entidad.cuentasContables.map(cuenta =>
          this._modificacionCuentaContable.guardar(cuenta, undefined, false)
        );
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
      tap(modificacion =>
        modificacion
          ? this._pdf.abrirReportePDFModificacion(modificacion)
          : undefined
      )
    );
  }
}
