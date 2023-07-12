import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SigespService } from 'sigesp';
import { Parroquia } from '@core/models/otros-modulos/parroquia';
import { adaptarParroquias } from '@core/utils/adaptadores-rxjs.ts/adaptar-parroquias';

@Injectable({
  providedIn: 'root',
})
export class ParroquiaService {
  private apiUrl = this._sigesp.URL + '/dao/sigesp/parroquia_dao.php';

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Parroquia[]> {
    return this._http.get<Parroquia[]>(this.apiUrl).pipe(adaptarParroquias());
  }
}
