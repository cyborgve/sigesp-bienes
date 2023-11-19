import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-activo',
  templateUrl: './plural-activo.component.html',
  styleUrls: ['./plural-activo.component.scss'],
})
export class PluralActivoComponent {
  titulo = 'bienes';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
