import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _location: Location, private _router: Router) {}

  actualizarBotonEjecutarDeshabilitado = (generarIncorporaciones: boolean) =>
    (this.botonEjecutarDeshabilitado = !generarIncorporaciones);

  generarIncorporaciones = this.generar.asObservable();

  clickBotonGenerar = () => this.generar.next(true);

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/']);
}
