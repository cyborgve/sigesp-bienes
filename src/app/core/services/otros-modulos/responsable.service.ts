import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SigespService } from 'sigesp';
import { adaptarResposables } from '@core/utils/adaptadores-rxjs.ts/adaptar-responsables';
import { Id } from '@core/types/id';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { filtrarValoresIniciales } from '@core/utils/operadores-rxjs/filtrar-valores-iniciales';
import { ordenarPorId } from '@core/utils/operadores-rxjs/ordenar-por-id';

@Injectable({
  providedIn: 'root',
})
export class ResponsableService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/responsable-dao.php';
  private apiUrlId = (id: Id) => `${this.apiUrl}?id_personal=${id}`;

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Responsable[]> {
    return this._http.get<Responsable[]>(this.apiUrl).pipe(
      map((respuesta: any) => respuesta.data),
      adaptarResposables(),
      filtrarValoresIniciales(),
      ordenarPorId()
    );
  }
}
