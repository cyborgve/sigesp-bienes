import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SigespService } from 'sigesp';
import { Empresa } from '@core/models/otros-modulos/empresa';
import { adaptarEmpresas } from '@core/utils/pipes-rxjs/adaptadores/adaptar-empresa';
import { Id } from '@core/types/id';
import { adaptarEmpresa } from '@core/utils/pipes-rxjs/adaptadores/adaptar-empresa';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/empresa-dao.php';
  protected apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  datosGeneralesTodasLasEmpresas(): Observable<Empresa[]> {
    return this._http.get<Empresa[]>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarEmpresas()
    );
  }

  datosGenerales(id: Id): Observable<Empresa> {
    return this._http.get<Empresa>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data[0]),
      map(normalizarObjeto),
      adaptarEmpresa()
    );
  }
}
