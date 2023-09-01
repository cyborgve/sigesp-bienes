import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-autorizacion-salida',
  templateUrl: './plural-autorizacion-salida.component.html',
  styleUrls: ['./plural-autorizacion-salida.component.scss'],
})
export class PluralAutorizacionSalidaComponent {
  titulo = 'autorizaciones de salida';
  constructor(private _router: Router, private _location: Location) {}

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/procesos']);
}
