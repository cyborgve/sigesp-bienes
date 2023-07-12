import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciudad } from '@core/models/otros-modulos/ciudad';
import { SigespService } from 'sigesp';
import { adaptarCiudades } from '@core/utils/adaptadores-rxjs.ts/adaptar-ciudades';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  private apiUrl = this._sigesp.URL + '/dao/sigesp/ciudad_dao.php';

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  buscarTodos(): Observable<Ciudad[]> {
    return this._http.get<Ciudad[]>(this.apiUrl).pipe(adaptarCiudades());
  }
}
