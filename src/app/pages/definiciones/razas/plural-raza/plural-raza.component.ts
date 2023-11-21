import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-raza',
  templateUrl: './plural-raza.component.html',
  styleUrls: ['./plural-raza.component.scss'],
})
export class PluralRazaComponent {
  titulo = 'razas';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
