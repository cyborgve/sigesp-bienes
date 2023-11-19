import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-catalogo-general',
  templateUrl: './plural-catalogo-general.component.html',
  styleUrls: ['./plural-catalogo-general.component.scss'],
})
export class PluralCatalogoGeneralComponent {
  titulo = 'catálogos generales';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
