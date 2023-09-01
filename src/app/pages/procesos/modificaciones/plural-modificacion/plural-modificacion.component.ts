import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-modificacion',
  templateUrl: './plural-modificacion.component.html',
  styleUrls: ['./plural-modificacion.component.scss'],
})
export class PluralModificacionComponent {
  titulo = 'modificaciones';
  constructor(private _router: Router, private _location: Location) {}

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/procesos']);
}
