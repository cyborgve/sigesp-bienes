import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensajeDialogoSpinnerService {
  private mensaje = new Subject<string>();

  obtenerMensaje = () => this.mensaje.asObservable();

  actualizarMensaje = (mensaje: string) => this.mensaje.next(mensaje);
}
