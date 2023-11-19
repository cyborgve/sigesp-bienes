import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-sede',
  templateUrl: './plural-sede.component.html',
  styleUrls: ['./plural-sede.component.scss'],
})
export class PluralSedeComponent {
  titulo = 'sedes';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
