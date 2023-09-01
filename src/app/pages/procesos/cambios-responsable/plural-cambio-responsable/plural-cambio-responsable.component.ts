import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-cambio-responsable',
  templateUrl: './plural-cambio-responsable.component.html',
  styleUrls: ['./plural-cambio-responsable.component.scss'],
})
export class PluralCambioResponsableComponent {
  titulo = 'cambios de responsable';
  constructor(private _router: Router, private _location: Location) {}

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/procesos']);
}
