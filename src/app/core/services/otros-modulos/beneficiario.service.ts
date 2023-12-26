import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Id } from '@core/types/id';
import { SigespService } from 'sigesp';
import { Beneficiario } from '@core/models/otros-modulos/beneficiario';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import {
  adaptarBeneficiario,
  adaptarBeneficiarios,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-beneficiario';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';

@Injectable({
  providedIn: 'root',
})
export class BeneficiarioService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/beneficiario-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Beneficiario[]> {
    return this._http.get<Beneficiario[]>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      adaptarBeneficiarios(),
      filtrarValoresIniciales()
    );
  }

  buscarPorId(id: Id): Observable<Beneficiario> {
    return this._http.get<Beneficiario>(this.apiUrlId(id)).pipe(
      map((resultado: any) => resultado.data),
      map((data: any[]) => data.map(normalizarObjeto)),
      map(data => data[0]),
      adaptarBeneficiario()
    );
  }
}
