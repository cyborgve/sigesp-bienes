import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MConfiguracionDB } from '../models/configuracion-db.model';
import { map, retry } from 'rxjs/operators';
import { stringify } from 'querystring';
import { ConfiguracionDB } from '../interfaces/interfaces';
import { MUsuario } from '../models/usuario.model';
import { SigespLocalService } from './sigesp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private sigesp: SigespLocalService) { }

  public obtenerConfigDB(): Observable<MConfiguracionDB[]>{
    return this.http.get(`${this.sigesp.servidor}/main/config_bd.php`).pipe(
      retry(3),
      map((res: any) => res.map(element => new MConfiguracionDB(element)))
    )
  }

  public logIn(userData): Observable<MUsuario>{
    let data = {
      conexion_postgres:{
        basededatos: userData.selectdb.obtenerDB(),
        gestor: userData.selectdb.obtenerGestor(),
        login: userData.selectdb.obtenerDBLogin(),
        nombre: userData.selectdb.nombre,
        password: userData.selectdb.obtenerDBPassword(),
        puerto: userData.selectdb.obtenerPuerto(),
        servidor: userData.selectdb.obtenerServidor()
      },
      fl_clave: userData.clave,
      fl_usuario: userData.usuario,
      operacionl: "iniciarsesion"
    }
    return this.http.post(`${this.sigesp.servidor}/dao/login/login_dao.php`,
    JSON.stringify(data))
    .pipe(
      retry(3),
      map((res: any) => {
        return new MUsuario(res, userData.selectdb)
      })
    )
  }
}
