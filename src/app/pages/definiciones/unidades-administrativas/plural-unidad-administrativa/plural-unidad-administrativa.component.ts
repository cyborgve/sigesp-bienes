import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-unidad-administrativa',
  templateUrl: './plural-unidad-administrativa.component.html',
  styleUrls: ['./plural-unidad-administrativa.component.scss'],
})
export class PluralUnidadAdministrativaComponent {
  titulo = 'unidades administrativas';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
