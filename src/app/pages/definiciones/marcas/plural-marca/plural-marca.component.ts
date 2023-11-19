import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-marca',
  templateUrl: './plural-marca.component.html',
  styleUrls: ['./plural-marca.component.scss'],
})
export class PluralMarcaComponent {
  titulo = 'marcas';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
