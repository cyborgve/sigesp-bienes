import { tap, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';
import { END_POINTS } from '@core/constants/end-points';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ActivoUbicacionService } from '../definiciones/activo-ubicacion.service';
import { adaptarCambiosResponsable } from '@core/utils/adaptadores-rxjs/adaptar-cambios-responsable';
import { Id } from '@core/types/id';
import { adaptarCambioResponsable } from '@core/utils/adaptadores-rxjs/adaptar-cambio-responsable';
import { PDFService } from '../auxiliares/pdf.service';
import { ejecutarCambioResponsable } from '@core/utils/funciones/ejecutar-cambio-responable';
import { abrirReporteProceso } from '@core/utils/funciones/abrir-reporte-proceso';
import { reversarCambioResponsable } from '@core/utils/funciones/reversar-cambio-responsable';

@Injectable({
  providedIn: 'root',
})
export class CambioResponsableService extends GenericService<CambioResponsable> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'cambioResponsable').valor;
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackBar: MatSnackBar,
    private _activoUbicacion: ActivoUbicacionService,
    private _pdf: PDFService
  ) {
    super(_http, _sigesp, _snackBar);
  }

  buscarTodos(): Observable<CambioResponsable[]> {
    return super.buscarTodos().pipe(adaptarCambiosResponsable());
  }

  buscarPorId(id: Id): Observable<CambioResponsable> {
    return super.buscarPorId(id).pipe(adaptarCambioResponsable());
  }

  guardar(
    cambioResponsable: CambioResponsable,
    tipoDato: string,
    notificar?: boolean
  ): Observable<CambioResponsable> {
    return super
      .guardar(cambioResponsable, tipoDato, notificar)
      .pipe(
        adaptarCambioResponsable(),
        ejecutarCambioResponsable(this._activoUbicacion),
        abrirReporteProceso(this._pdf, 'CAMBIO DE RESPONSABLE')
      );
  }

  eliminar(id: Id, tipoDato: string, notificar?: boolean): Observable<boolean> {
    return this.buscarPorId(id).pipe(
      switchMap(cambioResponsable =>
        super.eliminar(id, tipoDato, notificar).pipe(
          map(eliminado => (eliminado ? cambioResponsable : eliminado)),
          reversarCambioResponsable(this._activoUbicacion),
          map(cambio => !!cambio)
        )
      )
    );
  }
}
