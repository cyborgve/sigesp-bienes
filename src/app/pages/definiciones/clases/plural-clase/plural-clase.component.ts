import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-clase',
  templateUrl: './plural-clase.component.html',
  styleUrls: ['./plural-clase.component.scss'],
})
export class PluralClaseComponent {
  titulo = 'clases';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
