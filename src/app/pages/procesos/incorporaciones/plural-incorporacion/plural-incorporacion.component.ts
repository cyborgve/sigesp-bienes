import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-incorporacion',
  templateUrl: './plural-incorporacion.component.html',
  styleUrls: ['./plural-incorporacion.component.scss'],
})
export class PluralIncorporacionComponent {
  titulo = 'incorporaciones';
  constructor(private _router: Router, private _location: Location) {}

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/procesos']);
}
