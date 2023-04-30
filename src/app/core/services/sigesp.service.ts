import { Injectable, OnInit } from '@angular/core';
import { MUsuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SigespLocalService {

  constructor() { }

  public usuario: MUsuario = null;
  public servidor: string = null;

  public guardarUsuario(user: MUsuario){
    this.usuario = user;
    let cypher = btoa(JSON.stringify(this.usuario))
    sessionStorage.setItem("usuarioActual", cypher)
  }

  public guardarServidor(server: string){
    this.servidor = server;
    let cypher = btoa(this.servidor)
    sessionStorage.setItem("rutaServidor", cypher)
  }

  public sesionActiva(): boolean{
    if (!this.usuario) {
      if (!sessionStorage.getItem("usuarioActual")) {
        return false
      } else {
        let activeUser:MUsuario = JSON.parse(atob(sessionStorage.getItem("usuarioActual")));
        this.guardarUsuario(activeUser);
      }
    }
    return true;
  }

  public servidorActivo(): boolean{
    if (!this.servidor) {
      if (!sessionStorage.getItem("rutaServidor")) {
        return false
      } else {
        let ruta:string = atob(sessionStorage.getItem("rutaServidor"));
        this.guardarServidor(ruta);
      }
    }
    return true;
  }

  public cerrarSesion() {
    this.usuario = null;
    this.servidor = null;
    sessionStorage.clear()
  }

}
