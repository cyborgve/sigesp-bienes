import { switchMap, map } from 'rxjs/operators';
import { Observable, forkJoin, of, pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Activo } from '@core/models/definiciones/activo';
import { END_POINTS } from '@core/constants/end-points';
import { Id } from '@core/types/id';
import { ActivoDetalleService } from './activo-detalle.service';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivoComponenteService } from './activo-componente.service';
import { ActivoDepreciacionService } from './activo-depreciacion.service';
import { ActivoUbicacionService } from './activo-ubicacion.service';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
import { prepararActivoDetalle } from '@core/utils/funciones/preparar-activo-detalle';
import { prepararActivoDepreciacion } from '@core/utils/funciones/preparar-activo-depreciacion';
import { prepararActivoUbicacion } from '@core/utils/funciones/preparar-activo-ubicacion';
import { adaptarActivo } from '@core/utils/adaptadores-rxjs/adaptar-activo';
import { adaptarActivoDetalle } from '@core/utils/adaptadores-rxjs/adaptar-activo-detalle';
import { adaptarActivoDepreciacion } from '@core/utils/adaptadores-rxjs/adaptar-activo-depreciacion';
import { adaptarActivoUbicacion } from '@core/utils/adaptadores-rxjs/adaptar-activo-ubicacion';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { adaptarComponentes } from '@core/utils/adaptadores-rxjs/adaptar-componentes';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { activoIncorporado } from '@core/utils/funciones/activo-incorporado';

@Injectable({
  providedIn: 'root',
})
export class ActivoService extends GenericService<Activo> {
  private apiUrlUnidadAdministrativa = (unidadAdministrativa: Id) =>
    `${this.apiUrl}?unidad_administrativa=${unidadAdministrativa}`;
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'activo').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackbar: MatSnackBar,
    private _activoDetalle: ActivoDetalleService,
    private _activoComponente: ActivoComponenteService,
    private _activoDepreciacion: ActivoDepreciacionService,
    private _activoUbicacion: ActivoUbicacionService
  ) {
    super(_http, _sigesp, _snackbar);
  }

  buscarTodos(): Observable<Activo[]> {
    return super.buscarTodos();
  }

  buscarTodosPorUnidadAdministrativa(
    unidadAdministrativa: Id
  ): Observable<Activo[]> {
    return this._http
      .get(this.apiUrlUnidadAdministrativa(unidadAdministrativa))
      .pipe(
        map((resultado: any) => resultado.data),
        map((activos: any[]) => activos.map(activo => normalizarObjeto(activo)))
      );
  }

  /**
   * @description Obtiene todos los datos de un activo.
   * @param id string | number
   * @returns Observable<Activo>
   */
  buscarPorId(id: Id): Observable<Activo> {
    return super.buscarPorId(id).pipe(
      adaptarActivo(),
      switchMap(activo => {
        let buscarComplementos = [
          this._activoDetalle
            .buscarPorActivo(activo.id)
            .pipe(adaptarActivoDetalle()),
          this._activoDepreciacion
            .buscarPorActivo(activo.id)
            .pipe(adaptarActivoDepreciacion()),
          this._activoUbicacion
            .buscarPorActivo(activo.id)
            .pipe(adaptarActivoUbicacion()),
          this._activoComponente
            .buscarPorActivo(activo.id)
            .pipe(adaptarComponentes()),
        ];
        return forkJoin(buscarComplementos).pipe(
          map(([detalle, depreciacion, ubicacion, componentes]) => {
            let activoCompleto: Activo = {
              ...activo,
              detalle: detalle as ActivoDetalle,
              depreciacion: depreciacion as ActivoDepreciacion,
              ubicacion: ubicacion as ActivoUbicacion,
              componentes: componentes as ActivoComponente[],
            };
            return activoCompleto;
          })
        );
      })
    );
  }

  guardar(activoIn: Activo, tipoDato: string): Observable<Activo> {
    return super.guardar(activoIn, tipoDato).pipe(
      adaptarActivo(),
      switchMap((activoGuardado: any) => {
        let detalle = prepararActivoDetalle(activoIn.detalle);
        let depreciacion = prepararActivoDepreciacion(activoIn.depreciacion);
        let ubicacion = prepararActivoUbicacion(activoIn.ubicacion);
        detalle.activoId = Number(activoGuardado.id);
        depreciacion.activoId = Number(activoGuardado.id);
        ubicacion.activoId = Number(activoGuardado.id);
        let complementosGuardar = [
          this._activoDetalle.guardar(detalle, '', false),
          this._activoDepreciacion.guardar(depreciacion, '', false),
          this._activoUbicacion.guardar(ubicacion, '', false),
        ];
        return forkJoin(complementosGuardar).pipe(
          map(([detalle, depreciacion, ubicacion]) => {
            return {
              ...activoGuardado,
              detalle: detalle,
              depreciacion: depreciacion,
              ubicacion: ubicacion,
            };
          })
        );
      })
    );
  }

  actualizar(id: Id, activo: Activo, tipoDato: string): Observable<number> {
    let peticionesActualizar = [
      super.actualizar(id, activo, tipoDato),
      this._activoDetalle.actualizar(id, activo.detalle, '', false),
      this._activoDepreciacion.actualizar(id, activo.depreciacion, '', false),
      this._activoUbicacion.actualizar(id, activo.ubicacion, '', false),
    ];
    return forkJoin(peticionesActualizar).pipe(
      map(([act, det, dep, ubi]) => {
        if (
          Number(act) > 0 &&
          Number(det) > 0 &&
          Number(dep) > 0 &&
          Number(ubi) > 0
        )
          return 1;
        else return 0;
      })
    );
  }

  esDepreciable(id: Id): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      map(activo => {
        let { valorAdquisicion, monedaId, fechaAdquisicion, depreciacion } =
          activo;
        let esDepreciable = [
          valorAdquisicion > 0,
          monedaId !== '---',
          fechaAdquisicion !== undefined,
          depreciacion.metodoDepreciacion !== undefined,
          depreciacion.vidaUtil > 0,
          depreciacion.cuentaContableGasto !== '---',
          depreciacion.cuentaContableDepreciacion !== '---',
          depreciacion.depreciable !== 0,
          depreciacion.valorRescate > 0,
          depreciacion.monedaValorRescate !== '---',
        ];
        return esDepreciable.every(valor => !!valor);
      })
    );
  }

  filtrarIncorporados = () =>
    pipe(
      switchMap((activos: Activo[]) => {
        let buscarUbicaciones = activos.map(activo =>
          this._activoUbicacion.buscarPorActivo(activo.id).pipe(
            map(ubicacion => ({
              activo: ubicacion.activoId,
              incorporado: activoIncorporado(ubicacion),
            }))
          )
        );
        return forkJoin(buscarUbicaciones).pipe(
          map(resultados => {
            let incorporados = resultados
              .filter(resultado => resultado.incorporado)
              .map(resultado => resultado.activo);
            return activos.filter(activo => incorporados.includes(activo.id));
          })
        );
      })
    );

  filtrarSinIncorporar = () =>
    pipe(
      switchMap((activos: Activo[]) => {
        let buscarUbicaciones = activos.map(activo =>
          this._activoUbicacion.buscarPorActivo(activo.id).pipe(
            map(ubicacion => ({
              activo: ubicacion.activoId,
              incorporado: !activoIncorporado(ubicacion),
            }))
          )
        );
        return forkJoin(buscarUbicaciones).pipe(
          map(resultados => {
            let incorporados = resultados
              .filter(resultado => resultado.incorporado)
              .map(resultado => resultado.activo);
            return activos.filter(activo => incorporados.includes(activo.id));
          })
        );
      })
    );

  filtrarPorUnidadAdministrativa = (unidadAdministrativa: Id) =>
    pipe(
      switchMap((activos: Activo[]) => {
        let buscarUbicaciones = activos.map(activo =>
          this._activoUbicacion.buscarPorActivo(activo.id)
        );
        return forkJoin(buscarUbicaciones).pipe(
          map(ubicaciones => {
            let filtrados = ubicaciones
              .filter(
                ubicacion =>
                  ubicacion.unidadAdministrativaId === unidadAdministrativa
              )
              .map(ubicacion => ubicacion.activoId);
            return activos.filter(activo => filtrados.includes(activo.id));
          })
        );
      })
    );
}
