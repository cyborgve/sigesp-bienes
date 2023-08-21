import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SigespService } from 'sigesp';
import { Empresa } from '@core/models/otros-modulos/empresa';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/empresa-dao.php';

  constructor(private _sigesp: SigespService, private _http: HttpClient) {}

  datosGenerales(): Observable<Empresa> {
    return this._http.get<Empresa>(this.apiUrl).pipe(
      map((resultado: any) => resultado.data[0]),
      map(resultado => this.adaptarEmpresa(resultado))
    );
  }

  private adaptarEmpresa = (empresa: any) =>
    <Empresa>{
      id: empresa.id_empresa,
      rif: empresa.rifemp,
      nombre: empresa.nomemp,
      nombreAbreviado: empresa.titemp,
      direccion: empresa.diremp,
      telefono: empresa.telemp,
      fax: empresa.faxemp,
      correoElectronico: empresa.emaemp,
      paginaWeb: empresa.webemp,
    };
}
