import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { GenericService } from '../auxiliares/generic.service';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { adaptarCuentasContablesProceso } from '@core/utils/adaptadores-rxjs/adaptar-cuentas-contables-proceso';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarCuentaContableProceso } from '@core/utils/adaptadores-rxjs/adaptar-cuenta-contable-proceso';

@Injectable({
  providedIn: 'root',
})
export class DesincorporacionCuentaService extends GenericService<CuentaContableProceso> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'desincorporacionCuenta').valor;
  }
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;

  buscarTodos() {
    return super.buscarTodos().pipe(adaptarCuentasContablesProceso());
  }

  buscarTodosPorProceso(proceso: Id): Observable<CuentaContableProceso[]> {
    return this._http.get(this.apiUrlProceso(proceso)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(cuenta => normalizarObjeto(cuenta))),
      adaptarCuentasContablesProceso()
    );
  }

  buscarPorId(id: Id): Observable<CuentaContableProceso> {
    return super.buscarPorId(id).pipe(adaptarCuentaContableProceso());
  }

  guardar(
    entidad: CuentaContableProceso,
    tipoDato: string,
    notificar?: boolean
  ): Observable<CuentaContableProceso> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarCuentaContableProceso());
  }
}
