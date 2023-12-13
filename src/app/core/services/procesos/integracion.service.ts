import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { Integracion } from '@core/models/procesos/integracion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncorporacionService } from './incorporacion.service';
import { DepreciacionService } from './depreciacion.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IntegracionService extends GenericService<Integracion> {
  protected getEntidadUrl(): string {
    throw new Error('Method not implemented.');
  }

  constructor(
    protected _http: HttpClient,
    protected _sigesp: SigespService,
    protected _snackbar: MatSnackBar,
    private _incorporacion: IncorporacionService,
    private _depreciacion: DepreciacionService
  ) {
    super(_http, _sigesp, _snackbar);
  }

  buscarTodos(): Observable<Integracion[]> {
    return this._incorporacion.buscarTodos().pipe(
      map(incorporaciones =>
        incorporaciones.map(
          incorporacion =>
            <Integracion>{
              empresaId: incorporacion.empresaId,
              id: 0,
              comprobante: incorporacion.comprobante,
              tipo: 'INCORPORACION',
              activo: incorporacion.activos[0].id,
              creado: incorporacion.creado,
              modificado: incorporacion.modificado,
            }
        )
      )
    );
  }
}
