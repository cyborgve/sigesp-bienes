import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Municipio } from '@core/models/otros-modulos/municipio';
import { Observable } from 'rxjs';
import { SigespService } from 'sigesp';
import { adaptarMunicipios } from '@core/utils/adaptadores-rxjs.ts/adaptar-municipios';

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  private apiUrl = this._sigesp.URL + '/dao/sigesp/municipio_dao.php';

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Municipio[]> {
    return this._http.get<Municipio[]>(this.apiUrl).pipe(adaptarMunicipios());
  }
}
