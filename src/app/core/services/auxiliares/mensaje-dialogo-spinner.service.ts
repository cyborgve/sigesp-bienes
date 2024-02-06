import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

type TipoMensajeSpinner = 'TITULO' | 'MENSAJE' | 'MENSAJE INFERIOR';

interface MensajeSpinner {
  tipo: TipoMensajeSpinner;
  mensaje: string;
}

@Injectable({
  providedIn: 'root',
})
export class MensajeDialogoSpinnerService {
  private mensaje = new BehaviorSubject<MensajeSpinner>({
    tipo: 'MENSAJE',
    mensaje: '',
  });

  obtener = () => this.mensaje.asObservable();

  actualizar = (tipo: TipoMensajeSpinner, mensaje: string) =>
    this.mensaje.next({ tipo: tipo, mensaje: mensaje });
}
