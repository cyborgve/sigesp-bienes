import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-incorporaciones-migradas',
  templateUrl: './incorporaciones-migradas.component.html',
  styleUrls: ['./incorporaciones-migradas.component.scss'],
})
export class IncorporacionesMigradasComponent {
  botonEjecutarDeshabilitado = true;
  titulo = 'Generador de Incorporaciones para activos migrados manualmente';
  private generar = new BehaviorSubject<boolean>(false);

  actualizarBotonEjecutarDeshabilitado = (generarIncorporaciones: boolean) =>
    (this.botonEjecutarDeshabilitado = !generarIncorporaciones);

  generarIncorporaciones = this.generar.asObservable();

  clickBotonGenerar = () => this.generar.next(true);
}
