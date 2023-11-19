import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-color',
  templateUrl: './plural-color.component.html',
  styleUrls: ['./plural-color.component.scss'],
})
export class PluralColorComponent {
  titulo = 'colores';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
