import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Id } from '@core/types/id';
import { SigespService } from 'sigesp';
import { FuenteFinanciamiento } from '@core/models/otros-modulos/fuente-financiamiento';
import {
  adaptarFuenteFinanciamiento,
  adaptarFuentesFinanciamiento,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-fuente-financiamiento';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';

@Injectable({
  providedIn: 'root',
})
export class FuenteFinanciamientoService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/fuente-financiamiento-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<FuenteFinanciamiento[]> {
    return this._http.get<FuenteFinanciamiento[]>(this.apiUrl).pipe(
      map((res: any) => res.data),
      adaptarFuentesFinanciamiento(),
      filtrarValoresIniciales()
    );
  }

  buscarPorId(id: Id): Observable<FuenteFinanciamiento> {
    return this._http.get<FuenteFinanciamiento>(this.apiUrlId(id)).pipe(
      map((res: any) => res.data),
      map(proveedores => proveedores[0]),
      adaptarFuenteFinanciamiento()
    );
  }
}
