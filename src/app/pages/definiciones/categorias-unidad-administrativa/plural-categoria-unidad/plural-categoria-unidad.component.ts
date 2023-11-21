import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-categoria-unidad',
  templateUrl: './plural-categoria-unidad.component.html',
  styleUrls: ['./plural-categoria-unidad.component.scss'],
})
export class PluralCategoriaUnidadComponent {
  titulo = 'Categorías de Unidades Administrativas';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
