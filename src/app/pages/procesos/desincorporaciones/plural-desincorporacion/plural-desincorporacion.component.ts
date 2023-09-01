import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-desincorporacion',
  templateUrl: './plural-desincorporacion.component.html',
  styleUrls: ['./plural-desincorporacion.component.scss'],
})
export class PluralDesincorporacionComponent {
  titulo = 'desincorporaciones';
  constructor(private _router: Router, private _location: Location) {}

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/procesos']);
}
