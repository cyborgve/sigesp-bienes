import { Injectable } from '@angular/core';
import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { GenericService } from '../auxiliares/generic.service';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { adaptarComponentesProceso } from '@core/utils/pipes-rxjs/adaptadores/adaptar-componente-proceso';
import { Observable } from 'rxjs';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { map } from 'rxjs/operators';
import { adaptarComponenteProceso } from '@core/utils/pipes-rxjs/adaptadores/adaptar-componente-proceso';

@Injectable({
  providedIn: 'root',
})
export class ModificacionComponenteService extends GenericService<ComponenteProceso> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'modificacionComponente').valor;
  }
  private apiUrlProceso = (proceso: Id) => `${this.apiUrl}?proceso=${proceso}`;

  buscarTodos() {
    return super.buscarTodos().pipe(adaptarComponentesProceso());
  }

  buscarTodosPorProceso(proceso: Id): Observable<ComponenteProceso[]> {
    return this._http.get(this.apiUrlProceso(proceso)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarComponentesProceso()
    );
  }

  buscarPorId(id: Id): Observable<ComponenteProceso> {
    return super.buscarPorId(id).pipe(adaptarComponenteProceso());
  }

  guardar(
    entidad: ComponenteProceso,
    tipoDato: string,
    notificar?: boolean
  ): Observable<ComponenteProceso> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarComponenteProceso());
  }
}
