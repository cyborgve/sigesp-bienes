import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Id } from '@core/types/id';
import { SigespService } from 'sigesp';
import { ordenarPorId } from '@core/utils/pipes-rxjs/operadores/ordenar-por-id';
import { adaptarUnidadesOrganizativas } from '@core/utils/pipes-rxjs/adaptadores/adaptar-unidad-organizativa';
import { UnidadOrganizativa } from '@core/models/otros-modulos/unidad-organizativa';

@Injectable({
  providedIn: 'root',
})
export class UnidadOrganizativaService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/unidad-organizativa-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<UnidadOrganizativa[]> {
    return this._http.get<UnidadOrganizativa[]>(this.apiUrl).pipe(
      map((respuesta: any) => respuesta.data),
      adaptarUnidadesOrganizativas(),
      ordenarPorId()
    );
  }

  buscarPorId(id: Id): Observable<UnidadOrganizativa> {
    return this.buscarTodos().pipe(
      map(unidades => unidades.find(unidad => unidad.id === id))
    );
  }
}
