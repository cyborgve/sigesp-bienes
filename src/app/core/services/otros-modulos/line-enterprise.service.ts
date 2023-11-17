import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Id } from '@core/types/id';
import { SigespService } from 'sigesp';
import { LineEnterprise } from '@core/models/otros-modulos/line-enterprise';
import { ordenarPorId } from '@core/utils/pipes-rxjs/operadores/ordenar-por-id';
import { adaptarLinesEnterprise } from '@core/utils/pipes-rxjs/adaptadores/adaptar-line-enterprise';

@Injectable({
  providedIn: 'root',
})
export class LineEnterpriseService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/sigesp-line-enterprise-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<LineEnterprise[]> {
    return this._http.get<LineEnterprise[]>(this.apiUrl).pipe(
      map((respuesta: any) => respuesta.data),
      adaptarLinesEnterprise(),
      ordenarPorId()
    );
  }

  buscarPorId(id: Id): Observable<LineEnterprise> {
    return this.buscarTodos().pipe(
      map(linesEnterprise =>
        linesEnterprise.find(lineEnterprise => lineEnterprise.id === id)
      )
    );
  }
}
