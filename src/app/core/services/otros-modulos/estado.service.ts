import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '@core/models/otros-modulos/estado';
import { Observable } from 'rxjs';
import { SigespService } from 'sigesp';
import { adaptarEstados } from '@core/utils/pipes-rxjs/adaptadores/adaptar-estado';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private apiUrl = this._sigesp.URL + '/dao/sigesp/estado_dao.php';

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Estado[]> {
    return this._http.get<Estado[]>(this.apiUrl).pipe(adaptarEstados());
  }
}
