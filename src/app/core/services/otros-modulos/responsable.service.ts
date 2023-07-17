import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { Observable } from 'rxjs';
import { SigespService } from 'sigesp';

@Injectable({
  providedIn: 'root',
})
export class ResponsableService {
  private apiUrl = this._sigesp.URL + '/dao/sigesp/responsable_dao.php';

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Responsable[]> {
    return this._http.get<Responsable[]>(this.apiUrl).pipe();
  }
}
