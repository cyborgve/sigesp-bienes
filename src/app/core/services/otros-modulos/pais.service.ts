import { Pais } from '@core/models/otros-modulos/pais';
import { Injectable } from '@angular/core';
import { SigespService } from 'sigesp';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { adaptarPaises } from '@core/utils/pipes-rxjs/adaptadores/adaptar-paises';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl = this._sigesp.URL + '/dao/sigesp/pais_dao.php';

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Pais[]> {
    return this._http.get<Pais[]>(this.apiUrl).pipe(adaptarPaises());
  }
}
